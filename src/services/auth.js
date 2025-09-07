import axios from "axios"


let auth = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + '/auth'
});


export default auth;
