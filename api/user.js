import axiosInstance from "../api/axios";
import { ADMIN_URL } from "../constants/url";
//=================================================
export const getFilteredUsers = (filter) => {
  return axiosInstance.post(`/user`, filter);
};
export const getAllUsers = () => {
  //------------------------------------

  return axiosInstance.get(`/user/list`);
};
//------------------------------------
export const getUserById = (id) => {
  return axios.get(`${ADMIN_URL}/user/${id}`);
};
//----------------------------------
export const deleteUser = (id) => {
  return axios.delete(`${ADMIN_URL}/user/${id}`);
};
