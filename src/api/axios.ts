/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASEURL,
    withCredentials: true,
});

// Agregar un interceptor para ver los datos antes de enviarlos
instance.interceptors.request.use(config => {
    // console.log('Cookies interceptadas y enviadas:', document.cookie);
    // Verificar si estamos enviando FormData
    if (config.data instanceof FormData) {
        // Crear un objeto para almacenar los datos de FormData (no puedes ver directamente los archivos de FormData)
        const formData = config.data;
        
        // Mostrar el contenido de los archivos (solo los nombres y tamaños)
        const files: any = [];
        formData.forEach((value) => {
            if (value instanceof File) {
                files.push({
                    name: value.name,
                    size: value.size,
                    type: value.type,
                });
            }
        });
        // Mostrar los archivos que se están enviando
        console.log("Archivos enviados:", files);
        // También puedes ver los otros campos del FormData
        const otherFields: { [key: string]: any } = {};
        formData.forEach((value, key) => {
            if (!(value instanceof File)) otherFields[key] = value;
        });
        // console.log("Otros datos enviados:", otherFields);
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default instance;