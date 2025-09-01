import axios from "axios"


let auth = axios.create({
    baseURL: 'https://smartcity-backend.up.railway.app'
});


export default auth;
