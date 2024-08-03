// src/api/contact.js
import axios from 'axios';

console.log("API Base URL:", process.env.REACT_APP_API_BASE_URL);

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL

});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
});

export default api;
