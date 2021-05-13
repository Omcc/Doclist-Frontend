import axios from "axios";

export const LOGIN_URL="http://localhost:8001/api/auth/token/";
export const REGISTER_URL="api/auth/register";
export const REGISTER_PASSWORD=URL="api/auth/forgot-password";
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