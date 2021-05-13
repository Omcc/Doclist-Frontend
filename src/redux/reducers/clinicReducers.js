import {CLINIC_LOGIN_REQUEST,
        CLINIC_LOGIN_SUCCESS,
        CLINIC_LOGIN_FAIL,
        CLINIC_LOGOUT} 
    from "store/constants/clinicConstants"

export const clinicLoginReducer = (state = {},action) => {
    switch(action.type){
        case CLINIC_LOGIN_REQUEST:
            return {loading:true,}
        case CLINIC_LOGIN_SUCCESS:
            return {loading:false,userInfo:action.payload}
        case CLINIC_LOGIN_FAIL:
            return {loading:false,error:action.payload}
        case CLINIC_LOGOUT:
            return {}
        default:
            return state
    }
}