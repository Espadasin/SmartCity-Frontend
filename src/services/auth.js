import axios from "axios"


let auth = axios.create({
    baseURL: 'https://smartcity-backend-production.up.railway.app/auth'
});


export default auth;