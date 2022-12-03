import axios from "axios";
import { ADMIN_URL } from "../constants/url";

const axiosInstance = axios.create({
  baseURL: ADMIN_URL,
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("Token");
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
