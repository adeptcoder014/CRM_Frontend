import axios from "axios";
import { ADMIN_URL } from "../constants/url";
//=================================================
export const getUsers = (filter) => {
  console.log("filter --->", filter);
  return axios.post(`${ADMIN_URL}/user`,filter);
};
//------------------------------------
export const getUserById = (id) => {
  return axios.get(`${ADMIN_URL}/user/${id}`);
};
//----------------------------------
export const deleteUser = (id) => {
  return axios.delete(`${ADMIN_URL}/user/${id}`);
};
