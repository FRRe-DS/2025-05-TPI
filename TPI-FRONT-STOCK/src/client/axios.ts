import axios from "axios";
import { getKeycloakInstance } from "../context/auth/keycloak.instance"; 

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use(
  async (config) => {
    const keycloak = getKeycloakInstance();

    if (keycloak) {
      try {
        await keycloak.updateToken(30);
      } catch (err) {
        console.warn("No se pudo refrescar el token:", err);
      }

      if (keycloak.token) {
        config.headers.Authorization = `Bearer ${keycloak.token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);
