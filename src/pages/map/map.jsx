import "./map.css";
import { useNavigate } from "react-router";
import { ArrowLeft, Megaphone, UserRound, Info } from "lucide-react";
import { useEffect, useState } from "react";
import title from "../../assets/title.png"
import db from "../../services/db.js";

import MapComponent from "../../components/mapComponent/map.jsx";

function Map() {
    const [addingMarker, setAddingMarker] = useState(false);
    let navigate = useNavigate()

    return (
        <main id="main">

            <nav id="navbar">
                <button onClick={() => navigate('/')}><ArrowLeft /></button>
                <img src={title}  alt="title"/>
            </nav>

            <MapComponent addingMarker={addingMarker} />

            <p>Clique no botão "Reportar problema" para adicionar um novo marcador.</p>

            <section id="actions">
                    <button id="createFeedbackButton" onClick={() => setAddingMarker(true)}><Megaphone color="#0088cc" /> Reportar <br /> problema</button>
                    <div id="moreButtons">
                        <button id="adminButton" onClick={() => navigate("/loginAdmin")}><UserRound /></button>
                        <button id="infoButton"><Info /></button>
                    </div>
            </section>


        </main>
    );
}

export default Map;
