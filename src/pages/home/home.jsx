import "./home.css";
import { LiaUserCircle } from "react-icons/lia";
import { useNavigate } from "react-router";
import { ArrowLeft, Megaphone, ChartNoAxesCombined, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import Login from "../login/login.jsx";
import title from "../../assets/title.png"
import db from "../../services/db.js";

import MapComponent from "../../components/mapComponent/map.jsx";

function Main() {
    const [addingMarker, setAddingMarker] = useState(false);
    let navigate = useNavigate()

    return (
        <main id="main">

            <nav id="navbar">
                <img src={title}  alt="title"/>
                <button id="userButton" onClick={() => {navigate('/user')}}><LiaUserCircle color="gray" size={30}/></button>
            </nav>

            <MapComponent addingMarker={addingMarker} />

            <section id="actions">
                    <button id="createFeedbackButton" onClick={() => setAddingMarker(true)}><Megaphone color="#0088cc" /> Reportar <br /> problema</button>
                    <div id="moreButtons">
                        <button id="chartButton"><ChartNoAxesCombined /></button>
                        <button><Plus /></button>
                    </div>
            </section>


        </main>
    );
}

export default Main;
