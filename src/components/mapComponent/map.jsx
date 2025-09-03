import {MapContainer, TileLayer, Marker, Popup, Polygon, useMapEvents} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import "./map.css"
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import db from '../../services/db.js';
import { renderToString } from 'react-dom/server'   
import { MapPin, MapPinPlusInside } from 'lucide-react';


function LocationMarker({ addingMarker, onMarkerPlaced }){
    const navigate = useNavigate();
    const markerIcon = new L.DivIcon({
        className: 'markerIcon',
        html: renderToString(<MapPinPlusInside fill='lightblue' stroke='white' />),
        iconSize: [32, 32]
    });
    const [position, setPosition] = useState(null);
    const [comment, setComment] = useState("");
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
                <button  onClick={handleSave}>Save</button>
            </div>
        </Popup>
        </Marker>
    ) : null;
}

function MapComponent({ addingMarker }) {
    const position = [-16.6478, -49.4981];
    const userCustomIcon = new L.DivIcon({
        className: 'markerIcon',
        html: renderToString(<MapPin fill='red' color='white'/>),
        iconSize: [32, 32]
    })
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
                    <Marker key={index} icon={userCustomIcon} position={[item.latitude, item.longitude]}>
                        <Popup>
                            {item.commentary}
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