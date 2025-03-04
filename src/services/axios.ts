import axios from "axios";

// Base URL de la axiosInstance
const API_URL = "http://localhost:5000/api";

// Obtener el token de localStorage (o cualquier otro método de almacenamiento que uses)
const getToken = () => localStorage.getItem("token");

// Crear la instancia de Axios con el token
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Agregar un interceptor para incluir el token en cada solicitud
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
