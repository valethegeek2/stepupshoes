// Global Axios Configuration
import axios from "axios";

const API_BASE = "http://localhost:8080/api/v1";

export const API_CONFIG = {
  USE_MOCK: true
};

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json"
  }
});
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      "Unexpected API error";

    return Promise.reject(new Error(message));
  }
);

export default apiClient;