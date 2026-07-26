import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:9002',
    // timeout: 1000
})


export default instance