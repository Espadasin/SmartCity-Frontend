import axios from "axios"


let auth = axios.create({
    baseURL: 'http://localhost:8084/auth'
});


export default auth;
