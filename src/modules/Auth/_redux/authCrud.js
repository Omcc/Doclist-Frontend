import axios from "axios";
import {getAbsoluteApiUrl} from "modules/Helper"

export const LOGIN_URL=getAbsoluteApiUrl("/api/auth/token/")
export const REGISTER_URL=getAbsoluteApiUrl("/api/auth/register")
export const REGISTER_PASSWORD=getAbsoluteApiUrl("/api/auth/forgot-password");


export const CLINIC_DETAIL_URL =  (clinic_id) => getAbsoluteApiUrl(`/api/clinics/${clinic_id}/`)
export const CLINIC_STAFFS_URL = (clinic_id) => getAbsoluteApiUrl(`/api/clinics/${clinic_id}/staffs/`)
export const CLINIC_STAFF_DETAIL_URL = (clinic_id,staff_id) => getAbsoluteApiUrl(`/api/clinics/${clinic_id}/staffs/${staff_id}/`)

export const ME_URL="api/me"





// api constants


export const CLINIC_BASIC="clinic_basic"
export const CLINIC_STAFFS="clinic_staffs"



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




export function fetch(resource,params,body){
    const config = {
        headers:{
            'Content-type':'application/json'
        }
    }
    switch(resource){
        case CLINIC_BASIC:
            return axios.get(CLINIC_DETAIL_URL(params.clinicId),config)
        case CLINIC_STAFFS:
            return axios.get(CLINIC_STAFFS_URL(params.clinicId),config)

        default:
            return 0
            



    }



}

export function post(resource,params,body){
    const config = {
        headers:{
            'Content-type':'application/json'
        }
    }

    switch(resource){
        case CLINIC_STAFFS:
            return axios.post(CLINIC_STAFFS_URL(params.clinicId),body,config)

        default:
            return 0
    }
}

export function remove(resource,params){
    const config = {
        headers:{
            'Content-type':'application/json'
        }
    }

    switch(resource){
        case CLINIC_STAFFS:
            return axios.delete(CLINIC_STAFF_DETAIL_URL(params.clinicId,params.staffId),config)

        default:
            return 0
    }

}






