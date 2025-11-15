import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // your FastAPI backend URL
  withCredentials: false,          // change to true only if using cookies
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
