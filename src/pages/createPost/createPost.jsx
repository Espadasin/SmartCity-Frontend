import { useEffect, useState } from "react";
import db from "../../services/db";
import "./createPost.css"
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

function CreatePost(){
    let [comment, setComment] = useState({
        commentary : '',
        latitude : '',
        longitude : '',
        type : ''
    })
    let [errors, setErrors] = useState([])
    let navigate = useNavigate()

    function getLocation(){
        if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position)
                setComment(prev => ({
                    ...prev,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }))
            }, (error) => {
                console.log(error)
            });
        }else{
            console.log('Permission Denied')
        }
    }

    async function postComment(e){
        e.preventDefault();

        let data = {
            commentary : comment.commentary,
            latitude : comment.latitude,
            longitude : comment.longitude,
            type : comment.type
        };

        getLocation();

        // let response = await db.post('/postFeedback', data);
        console.log(data)

        // if(response.data.errors && response.data.errors.length > 0){
        //     setErrors(response.data.errors);
        // }else{
        //     navigate('/');
        // }

        
    }

    useEffect(() => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position) => {
                setComment(prev => ({
                    ...prev,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }))
            }, (error) => {
                console.log(error)
            });
        }else{
            console.log('Permission Denied')
        }
    }, []);

    return(
        <main>
            <section id="form">
                <form onSubmit={postComment} id="postForm">

                    <button type="button" className="backButton" onClick={() => {navigate('/')}}><ArrowLeft /></button>
                    <label htmlFor="commentary">Comentário</label>
                    <textarea maxLength={300} type="text" name="commentary" id="commentary" onChange={(e) => {setComment(prev => ({...prev, commentary: e.target.value}))}}></textarea>
                    <button type="submit">Enviar</button>

                    <div id="errors">
                        {errors.map((error, index) => {
                            return <p key={index}>{error}*</p>
                        })}
                    </div>

                </form>
            </section>
        </main>
    );
}

export default CreatePost;