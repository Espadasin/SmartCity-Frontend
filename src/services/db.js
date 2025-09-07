import axios from "axios"


let db = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
});



export default db;



