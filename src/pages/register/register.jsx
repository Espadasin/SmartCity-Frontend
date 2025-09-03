import './register.css';

import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from 'lucide-react';

import auth from "../../services/auth";


function Register(){
    const navigate = useNavigate();
    let [errors, setErrors] = useState([]);
    let [registerParams, setRegisterParams] = useState({
        nickname: '',
        email: '',
        password: ''
    });

    async function handleRegister(e){
        e.preventDefault();

        let data = {
            nickname: registerParams.nickname,
            email: registerParams.email,
            password: registerParams.password
        }

        const response = await auth.post('/register', data)

        if(response.data.errors){
            setErrors(response.data.errors || [])
            return;
        }

        navigate('/login');
    }

    return(
        <main id="main">
            
            <section id='registerPage'>
                <button className='backButton' onClick={() => {navigate('/login')}}><ArrowLeft /></button>

                <form id="registerForm">
                    <input type="text" name="nickname" onChange={(e) => (registerParams.nickname = (e.target.value))} placeholder="Nome" />
                    <input type="email" name="email" onChange={(e) => (registerParams.email = (e.target.value))} placeholder="E-mail" />
                    <input type="password" name="password" onChange={(e) => (registerParams.password = (e.target.value))} maxLength={12} minLength={0} placeholder="Senha" />
                    <button type="submit" onClick={handleRegister}>Entrar</button>
                </form>

                <div id="errors">
                    {errors.map((error, index) => {
                        return <p key={index}>{error}*</p>
                    })}
                </div>

            </section>
    
        </main>
    );
};

export default Register;