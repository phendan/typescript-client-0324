import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:80',
    // For Laravel Sanctum
    // withXSRFToken: true;
    withCredentials: true
});

export default http;
