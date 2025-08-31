import axios from "axios"


let db = axios.create({
    baseURL: 'https://smartcity-backend-production.up.railway.app'
});


export default db;