import axios from "axios"


let auth = axios.create({
    baseURL: 'https://smartcity-backend.up.railway.app/auth'
});


export default auth;
