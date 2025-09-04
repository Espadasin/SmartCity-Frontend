import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import admin from '../../services/admin.js';
import db from '../../services/db.js';
import './admin.css';
import { use, useEffect, useState } from 'react';

function Admin(){
    let [data, setData] = useState([]);
    let navigate = useNavigate();
    let [filter, setFilter] = useState("Todas");

    async function getFeedbacks(){
        
        try{
            let response = await db.get("/getComments");
            
            if(filter === "Todas"){
                setData(response.data);
            }else if(filter === "Resolvidos"){
                setData(response.data.filter(item => item.solved === true));
            }else if(filter === "Pendentes"){
                setData(response.data.filter(item => item.solved === false));
            }
        }catch(error){
            console.log(error);
        }
    }

    async function deleteFeedback(id){
        try{
            let response = await admin.delete(`/deleteComment/${id}`);
            if(response.data){
                getFeedbacks();
            }
        }catch(error){
            console.log(error);
        }
    };

    async function solveFeedback(id){
        try{
            let response = await admin.put(`/solveComment/${id}`);
            if(response.data){
                getFeedbacks();
            }
        }catch(error){
            console.log(error);
        }
    };

    useEffect(()=> {
        getFeedbacks();
    }, [filter])

    return (
        <main id="main">
            <button id='backButton' onClick={() => navigate('/')}><ArrowLeft /></button>
            <select name="filter" id="filter" onChange={(e) => setFilter(e.target.value)}>
                <option value="Todas">Todas</option>
                <option value="Resolvidos">Resolvidos</option>
                <option value="Pendentes">Pendentes</option>
            </select>

            {data.map((item, index) => {
                return (
                    <div key={index} id='feedbackItem'>
                        <div id='info'>
                            <p>{item.commentary}</p>
                            <span>Tipo: {item.type}</span>
                            <span>Status: {item.solved ? "Resolvido" : "Pendente"}</span>
                            <span>{new Date(item.createdAt).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <button id='deleteButton' onClick={() => deleteFeedback(item.id)}>Excluir</button>
                        <button id='solvedButton' onClick={() => solveFeedback(item.id)}>Solucionar</button>
                    </div>
                )
            })}

        </main>
    );
}

export default Admin;