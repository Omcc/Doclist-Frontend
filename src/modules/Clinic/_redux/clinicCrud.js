import axios from "axios"
import {getAbsoluteApiUrl} from "modules/Helper"



export const CLINIC_TYPES_URL = getAbsoluteApiUrl("/api/clinic-types/")
export const CLINIC_CREATE_URL = getAbsoluteApiUrl("/api/clinics/")


export function getClinicTypes(){
    const config = {
        headers:{
            'Content-type':'application/json'
        }
    }

    return axios.get(CLINIC_TYPES_URL,config)
}


export function createClinic(body){
    const config = {
        headers:{
            'Content-type':'application/json'
        }
    }

    return axios.post(CLINIC_CREATE_URL,body,config)
}
