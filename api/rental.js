import axiosInstance from "../api/axios";
//========================================

export const getRent = ()=>{
    return axiosInstance.get(`/rent`)
}