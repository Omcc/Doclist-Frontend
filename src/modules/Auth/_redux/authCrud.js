import axios from "axios";
import {getAbsoluteApiUrl} from "modules/Helper"

export const LOGIN_URL=getAbsoluteApiUrl("/api/auth/token/")
export const REGISTER_URL=getAbsoluteApiUrl("/api/auth/register")
export const REGISTER_PASSWORD=getAbsoluteApiUrl("/api/auth/forgot-password");
export const ME_URL="api/me"

export function login(email,password){
    const config = {
        headers:{
            'Content-type':'application/json'
        }
    }
    console.log(email,password)
    return axios.post(LOGIN_URL,{"email":email,"password":password},config)
}

export function getUserByToken(){
    return axios.get(ME_URL);
}