import { useEffect, useState } from "react";
import db from "../../services/db";
import location from "../../services/map"
import axios from "axios";
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

    let [isHide, setIsHide] = useState('')
    let [Street, setStreet] = useState('')

    function capitalizeEachWord(str){
        const words = str.toLowerCase().split(' ');
        const capitalizedWords = words.map(word => {
            if (word.length === 0) {
                return '';
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
            
        });
        return capitalizedWords.join(' ');
    }

    function getLocation(){
        if("geolocation" in navigator){
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
    }

    async function getLocationByInput(street){
        const position = await location.get('/search', {params: 
            {
                q : capitalizeEachWord(street) + " ,Trindade, Brazil",
                format: "json"
            }
        })
        
        if(position.data.length > 0 && street !== '' && street !== ' '){
            setComment(prev => ({
                ...prev,
                latitude: position.data[0].lat,
                longitude: position.data[0].lon
            }))
        }else{
            console.log(setErrors(['Preenchar com uma rua valida']))
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

        if(isHide == ''){
            getLocationByInput(Street);
        }else if(isHide == 'hidden'){
            getLocation();
        }

        if(comment.latitude && comment.longitude){
            let response = await db.post('/postFeedback', data);

            if(response.data.errors && response.data.errors.length > 0){
                setErrors(response.data.errors);
            }else{
                navigate('/');
            }
        }
    }

    useEffect(() => {
        navigator.permissions.query({name : 'geolocation'}).then((result) => {
            if(result.state == 'granted'){
                setIsHide('hidden')
            }else if(result.state == 'prompt'){
                return
            }else if(result.state == 'denied'){
                setIsHide('')
            }
        })
    }, [ ])

    return(
        <main>
            <section id="form">
                <form onSubmit={postComment} id="postForm">

                    <button type="button" className="backButton" onClick={() => {navigate('/')}}><ArrowLeft /></button>
                    <label htmlFor="commentary">Comentário</label>
                    <textarea maxLength={300} type="text" name="commentary" id="commentary" onChange={(e) => {setComment(prev => ({...prev, commentary: e.target.value}))}}></textarea>
                    <input className={isHide} type="text" name="Street" id="Street" placeholder="Digite o nome da rua" onChange={(e) => {setStreet(e.target.value)}} />
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