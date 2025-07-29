import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const API = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});


API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
