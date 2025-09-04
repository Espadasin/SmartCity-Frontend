import "./home.css";
import { useNavigate } from "react-router";
import logo from "../../assets/logo.png"

function Home(){
    let navigate = useNavigate()

    return(
        <main id="main">
            <div id="welcomeBox">
                <img id="logo" src={logo} width={300} alt="Logo" />
                <button onClick={() => {navigate("/map")}}>Começar</button>
            </div>
        </main>
    );
}

export default Home;