import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

if (!apiBaseUrl) {
  console.warn('VITE_API_BASE_URL no está definido. Configura la URL del backend en el archivo .env.');
}

const axiosClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message ?? error.message ?? 'Error desconocido';
    return Promise.reject(new Error(message));
  },
);

export default axiosClient;
