import axios from "axios";
import { ADMIN_URL } from "../constants/url";

export const getUsers = () => {
  return axios.get(`${ADMIN_URL}/user`);
};
