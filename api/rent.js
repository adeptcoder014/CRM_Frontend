import axios from "axios"
import { ADMIN_URL } from "../constants/url"
//========================================

export const getRent = ()=>{
    return axios.get(`${ADMIN_URL}/rent`)
}