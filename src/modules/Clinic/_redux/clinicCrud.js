import axios from "axios"
import {getAbsoluteApiUrl} from "modules/Helper"



export const CLINIC_TYPES_URL = getAbsoluteApiUrl("/api/clinic-types/")


export function getClinicTypes(){
    const config = {
        headers:{
            'Content-type':'application/json'
        }
    }

    return axios.get(CLINIC_TYPES_URL,config)
}

