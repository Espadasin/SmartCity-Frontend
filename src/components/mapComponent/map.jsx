import {MapContainer, TileLayer, Marker, Popup, Polygon, useMapEvents} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import "./map.css"
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import db from '../../services/db.js';
import { renderToString } from 'react-dom/server'   
import { MapPin, 
    MapPinPlusInside, 
    SmartphoneCharging, 
    Building2, 
    ShieldQuestionMark, 
    DropletOff 
} from 'lucide-react';


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
    const popupRef = useRef();

    useMapEvents({
        click(e) {
            if (addingMarker) {
                setPosition(e.latlng);
                onMarkerPlaced();
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
        await db.post("/postComment", {
            latitude: position.lat,
            longitude: position.lng,
            commentary: comment,
            type: type
        });
        navigate(0);
        setComment("");
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
    const userTypeIcons = {
        "Geral": new L.DivIcon({
            className: 'markerIcon',
            html: renderToString(<MapPin fill='red' color='black'/>),
            iconSize: [32, 32]
        }),
        "Energia": new L.DivIcon({
            className: 'markerIcon',
            html: renderToString(<SmartphoneCharging fill='lightyellow' color='black'/>),
            iconSize: [32, 32]
        }),
        "Infraestrutura": new L.DivIcon({
            className: 'markerIcon',
            html: renderToString(<Building2 fill='lightgreen' color='black'/>),
            iconSize: [32, 32]
        }),
        "Segurança": new L.DivIcon({
            className: 'markerIcon',
            html: renderToString(<ShieldQuestionMark fill='lightblue' color='black'/>),
            iconSize: [32, 32]
        }),
        "Saneamento": new L.DivIcon({
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
            <MapContainer className='mapContainer' center={position} zoom={13} minZoom={13} zoomControl={true} dragging={true} scrollWheelZoom={false}>
                
                
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />  

                
                {data.map((item, index) => (
                    <Marker key={index} icon={userTypeIcons["Geral"]} position={[item.latitude, item.longitude]}>
                        <Popup>
                            {item.commentary}
                        </Popup>
                    </Marker>
                ))}

                <LocationMarker 
                    addingMarker={addingMarker}
                    onMarkerPlaced={() => console.log(type)}
                />

            </MapContainer>
        </div>

    );
}

export default MapComponent;
