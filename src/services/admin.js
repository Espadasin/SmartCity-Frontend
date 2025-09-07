import axios from "axios"


let admin = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + '/admin'
});


export default admin;
