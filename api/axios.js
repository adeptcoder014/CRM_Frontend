import axios from "axios";
import { ADMIN_URL } from "../constants/url";


axios.defaults.baseURL = ADMIN_URL;

const ISSERVER = typeof window === 'undefined';

if (!ISSERVER) {
  let token = localStorage.getItem('token')
  axios.interceptors.request.use((request) => {
    if (!token) {
      token = localStorage.getItem("token")
    }
    if (!token) return request;
    request.headers["Authorization"] = `Bearer ${token}`;
    return request;
  });
}

axios.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.log(err);

    if (err.response) {
      if (err.response.status == 401) {
        localStorage.clear();
        token = null
        window.location.href = "/login"
        return Promise.reject({message:"Logged out"})
    }
      return Promise.reject({
        message: err.response.message || err.response.statusText || "Unkown Error ",
        status: err.response.status,
        ...err.response.data,
      });
    } else if (err.request) {
      return Promise.reject({
        message: "Server is down, please try again later",
      });
    } else {
      return Promise.reject({
        message: err.message,
      });
    }
  }
);
