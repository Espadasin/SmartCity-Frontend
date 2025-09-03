import './feedback.css';
import db from "../../services/db.js";
import {useEffect, useState } from "react";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';


function Feedback(){
    let [comments, setComment] = useState([])
    let placeholder = [{
        id: 1,
        title: "Título do Comentário",
        commentary: "Comentário de exemplo",
        municipality: "Maysa"
    },
    {
        id: 2,
        title: "Título do Comentário 2",
        commentary: "Comentário de exemplo 2",
        municipality: "Maysa"
    }
]
    let navigate = useNavigate()

    async function getComment() {
        let commentData = await db.get(`/getComments/Maysa`)

        setComment(commentData.data)
    }

    useEffect(() => {
        getComment()
    }, []);

    return(
        <main>

            <section id='feedbacks'>

                <div id="posts">
                    <button className="backButton" onClick={() => {navigate('/')}}><ArrowLeft /></button>
                    {comments.map((posts) => {
                        return (
                            <div className='Interface' key={posts.id}>
                                <h1>{posts.title}</h1>
                                <p>{posts.commentary}</p>
                            </div>
                        );  
                    })}
                </div>
            </section>
        </main>
    );
}

export default Feedback;