import axios from "axios";


const location = axios.create({
    baseURL: "https://nominatim.openstreetmap.org"
})

export default location;