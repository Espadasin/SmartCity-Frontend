import axios from "axios"


let db = axios.create({
    baseURL: 'http://localhost:8084'
});



export default db;


