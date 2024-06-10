//src/api/contact.js
// import axios from 'axios';

// export default axios.create({
//     baseURL : "http://localhost:4000",
// })

// src/api/contact.js
import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:4000",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
});

export default api;
