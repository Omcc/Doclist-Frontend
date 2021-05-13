import axios from "axios"

import {
    CLINIC_LOGIN_REQUEST,
    CLINIC_LOGIN_SUCCESS,
    CLINIC_LOGIN_FAIL,
    CLINIC_LOGOUT
} from "store/constants/clinicConstants"


export const loginClinic = (email,password) => async (dispatch) => {
    try {
        dispatch({
            type:CLINIC_LOGIN_REQUEST
        })
        
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }
        const {data} = await axios.post(
            "http://localhost:8001/api/auth/token/",
            {'email':email,'password':password},
            config
            )
        dispatch({
            type:CLINIC_LOGIN_SUCCESS,
            payload:data
        }) 

        localStorage.setItem('userInfo',JSON.stringify(data))
    } catch(error){
        dispatch({
            type: CLINIC_LOGIN_FAIL,
            payload:error.response && error.response.data.detail ? error.response.data.detail:error.message
        })
    }

}