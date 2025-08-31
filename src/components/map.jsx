import {MapContainer, TileLayer, Marker, Popup, Polygon} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import "./map.css"
import { useEffect, useState } from 'react';
import db from '../services/db.js';
import { renderToString } from 'react-dom/server'
import { MapPin } from 'lucide-react';

function MapComponent() {
    const position = [-16.6478, -49.4981];
    const userCustomIcon = new L.DivIcon({
        className: 'markerIcon',
        html: renderToString(<MapPin fill='red' color='white'/>) ,
        iconSize: [32, 32]
    })
    let [data, setData] = useState([]);

    async function getFeedbacks(){
        
        try{
            let response = await db.get('/getFeedbacks');
            setData(response.data);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=> {
        getFeedbacks();
    }, [])

    return (
        
        
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

        </MapContainer>

    );
}

export default MapComponent;