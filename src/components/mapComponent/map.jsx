import {MapContainer, TileLayer, Marker, Popup, Polygon, useMapEvents} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import "./map.css"
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { renderToString } from 'react-dom/server'   
import { MapPin, 
    MapPinPlusInside, 
    SmartphoneCharging, 
    Building2, 
    ShieldQuestionMark, 
    DropletOff 
} from 'lucide-react';

import db from '../../services/db.js';
import location from '../../services/map.js';
import axios from 'axios';


function LocationMarker({ addingMarker, onMarkerPlaced }){
    const navigate = useNavigate();
    const markerIcon = new L.DivIcon({
        className: 'markerIcon',
        html: renderToString(<MapPinPlusInside fill='lightblue' stroke='white' />),
        iconSize: [32, 32]
    });
    const [position, setPosition] = useState(null);
    const [comment, setComment] = useState("");
    const [type, setType] = useState("Geral");
    const [image, setImage] = useState(null);
    const popupRef = useRef();

    useMapEvents({
        click(e) {
            if (addingMarker) {
                setPosition(e.latlng);
                onMarkerPlaced();
            }else{
                setPosition(null);
            }
        },
    });

    useEffect(() => {
        if (popupRef.current) {
            popupRef.current.openPopup();
        }
    }, [position]);

    const handleSave = async () => {
        if (!position || !comment) return alert("Preencha todos os campos.");

        const formData = new FormData();
        formData.append("latitude", position.lat);
        formData.append("longitude", position.lng);
        formData.append("commentary", comment);
        formData.append("type", type);
        if (image) {
            formData.append("image", image);
        }

        await db.post("/postComment", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        navigate(0);
        setComment("");
        setImage(null);
    };

    return position ? (
        <Marker ref={popupRef} position={position} icon={markerIcon}>
        <Popup autoClose={false} closeButton={false} minWidth={200} autoPan={true}>
            <div className='markerPopup'>
                <textarea
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                />
                <label htmlFor="image">Imagem</label>
                <input type="file" accept='image/*' name="image" id="image" onChange={(e) => setImage(e.target.files[0])} />
                <label htmlFor="type">Tipo do Problema</label>
                <select onChange={(e) => setType(e.target.value)} name="type" id="type" placeholder="Tipo do Problema">
                    <option value="Geral">Geral</option>
                    <option value="Energia">Energia</option>
                    <option value="Infraestrutura">Infraestrutura</option>
                    <option value="Segurança">Segurança</option>
                    <option value="Saneamento">Saneamento</option>
                </select>
                <button  onClick={handleSave}>Save</button>
            </div>
        </Popup>
        </Marker>
    ) : null;
}

function MapComponent({ addingMarker }) {
    const position = [-16.6478, -49.4981];
    const userIcon = new L.DivIcon({
        className: 'userIcon',
        html: renderToString(<MapPin fill='red' color='white'/>),
        iconSize: [32, 32]
    });

    const userTypeIcons = {
        Geral: new L.DivIcon({
            className: 'markerIcon',
            html: renderToString(<MapPin fill='red' color='black'/>),
            iconSize: [32, 32]
        }),
        Energia: new L.DivIcon({
            className: 'markerIcon',
            html: renderToString(<SmartphoneCharging fill='lightyellow' color='black'/>),
            iconSize: [32, 32]
        }),
        Infraestrutura: new L.DivIcon({
            className: 'markerIcon',
            html: renderToString(<Building2 fill='lightgreen' color='black'/>),
            iconSize: [32, 32]
        }),
        Segurança: new L.DivIcon({
            className: 'markerIcon',
            html: renderToString(<ShieldQuestionMark fill='lightblue' color='black'/>),
            iconSize: [32, 32]
        }),
        Saneamento: new L.DivIcon({
            className: 'markerIcon',
            html: renderToString(<DropletOff fill='lightblue' color='black'/>),
            iconSize: [32, 32]
        })
    }
    let [data, setData] = useState([]);

    async function getFeedbacks(){
        
        try{
            let response = await db.get('/getComments');
            setData(response.data);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=> {
        getFeedbacks();
    }, [])

    return (
        <div>
            <MapContainer className='mapContainer' center={position} zoom={13} minZoom={12} zoomControl={true} dragging={true} scrollWheelZoom={false}>
                
                
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />  

                
                {data.map((item, index) => (
                    <Marker key={index} icon={userTypeIcons[item.type]} position={[item.latitude, item.longitude]}>
                        <Popup >
                            <div className='popup'>
                                {item.solved ? <span style={{color: 'green', fontWeight: 'bold'}}>RESOLVIDO</span> : <span style={{color: 'red', fontWeight: 'bold'}}>PENDENTE</span>}
                                {item.commentary}   
                                {item.image && <img src={import.meta.env.VITE_BACKEND_URL + item.image} alt="User upload" width={100}/>}
                            </div>
                        </Popup>
                    </Marker>
                ))}

                <LocationMarker 
                    addingMarker={addingMarker}
                    onMarkerPlaced={() => console.log("Marker placed")}
                />

            </MapContainer>
        </div>

    );
}

export default MapComponent;