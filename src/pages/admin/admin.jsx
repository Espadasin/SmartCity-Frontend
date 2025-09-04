import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import db from '../../services/db.js';
import './admin.css';
import { useEffect, useState } from 'react';

function Admin(){
    let [data, setData] = useState([]);
    let navigate = useNavigate();

    async function getFeedbacks(){
        
        try{
            let response = await db.get('/getComments');
            setData(response.data);
        }catch(error){
            console.log(error);
        }
    }

    async function deleteFeedback(id){
        try{
            let response = await db.delete(`/deleteComment/${id}`);
            if(response.data){
                getFeedbacks();
            }
        }catch(error){
            console.log(error);
        }
    };

    async function solveFeedback(id){
        try{
            let response = await db.put(`/solveComment/${id}`);
            if(response.data){
                getFeedbacks();
            }
        }catch(error){
            console.log(error);
        }
    };

    useEffect(()=> {
        getFeedbacks();
    }, [])

    return (
        <main id="main">
            {data.map((item, index) => {
                return (
                    <div key={index} id='feedbackItem'>
                        <div id='info'>
                            <p>{item.commentary}</p>
                            <span>{new Date(item.createdAt).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <button id='deleteButton' onClick={() => deleteFeedback(item.id)}>Excluir</button>
                        <button id='solvedButton'>Solucionar</button>
                    </div>
                )
            })}

            <button id='backButton' onClick={() => navigate('/')}><ArrowLeft /></button>
        </main>
    );
}

export default Admin;