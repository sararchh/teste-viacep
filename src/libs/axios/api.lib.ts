import axios from "axios";
import { apiConfig } from "@/config/api.config";

export function setupApiClient() {
  const api = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 10000,
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response.status === 500) {
        alert("Servidor não encontrado");
      }

      return Promise.reject(error);
    }
  );

  return api;
}
