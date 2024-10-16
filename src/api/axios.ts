import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASEURL,
    withCredentials: true,
});

instance.interceptors.request.use(config => {
    // console.log('Cookies interceptadas y enviadas:', document.cookie);
    return config;
}, error => {
    return Promise.reject(error);
});

export default instance;