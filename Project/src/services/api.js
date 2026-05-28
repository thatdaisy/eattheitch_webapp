import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api', // Die URL deines Node.js/Java Backends
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 10000
});

export default apiClient;