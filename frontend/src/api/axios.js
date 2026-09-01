import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
  baseURL,
  validateStatus: function (status) {
    return (status >= 200 && status < 500)
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // get JWT
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
