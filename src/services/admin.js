import axios from "axios"


let admin = axios.create({
    baseURL: 'https://smartcity-backend.up.railway.app/admin'
});


export default admin;
