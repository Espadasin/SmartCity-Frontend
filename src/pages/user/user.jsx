import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import './user.css'
import db from "../../services/db";
import { useState } from "react";
import { useNavigate } from "react-router";

function User({ userData, setIsLogged }){
    let [user, setUser] = useState();
    let navigate = useNavigate()

    async function getCurrentUser(){
        const response = await db.get(`/getUser/${userData.id}`);

        setUser(response.data)
    };

    function logout(){
        localStorage.removeItem('token');
        setIsLogged(false);
        navigate('/login');
    }

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <main id="main">
            
            <section id="userInterface">
                
                <button id="backButton" onClick={() => {navigate('/')}}><ArrowLeft color="black"/></button>
                <section id="userInfo">
                    <div id="perfil"></div>
                    <h1>{user ? user['nickname'] : 'Guest'}</h1>
                    <p id='email'>{user ? user['email'] : ''}</p>
                </section>
                <button id="logout" onClick={logout}>Logout</button>

            </section>

        </main>
    );
};

export default User;