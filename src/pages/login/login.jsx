import "./login.css"
import { ArrowLeft } from "lucide-react";
import { data, useNavigate } from "react-router";
import { useState } from "react";
import auth from "../../services/auth";
import logo from "../../assets/logo.png"
import { useEffect } from "react";
import { use } from "react";

function Login({setIsLogged, isAuth, userData}){
    let navigate = useNavigate();
    let [errors, setErrors] = useState([]);
    let [loginParams, setLoginParams] = useState({
        email: '',
        password: ''
    })

    async function handleLogin(e){
        e.preventDefault();

        let data = {
            email: loginParams.email,
            password: loginParams.password
        } 
        
        const response = await auth.post('/login', data)
        
        if(response.data.errors){
            setErrors(response.data.errors || [])
            return;
        }

        setIsLogged(true);
        localStorage.setItem('token', response.data);
        navigate('/admin')
    }

    useEffect(() => {
        if(localStorage.getItem('token')){
            setIsLogged(true);
            navigate('/admin')
        }
    }, [])

    return(
        <main id="main">

            <section id="loginPage">

                <div id="logo">
                    <img src={logo} width={300} alt="logo"/>
                </div>

                <form id="loginForm">
                    <input type="email" name="email" onChange={(e) => (loginParams.email = (e.target.value))} placeholder="E-mail" />
                    <input type="password" name="password" onChange={(e) => (loginParams.password = (e.target.value))} maxLength={12} minLength={0} placeholder="Senha" />
                    <button type="submit" onClick={handleLogin}>Entrar</button>
                </form>

                <div id="accountButtons">
                    <button id="backButton" onClick={() => {navigate("/map")}}><ArrowLeft /></button>
                </div>

                <div id="errors">
                    {errors.map((error, index) => {
                        return <p key={index}>{error}*</p>
                    })}
                </div>
            </section>


        </main>
    );
}

export default Login;