import {persistReducer} from "redux-persist";
import {put,takeLatest} from "redux-saga/effects";
import {getClinicTypes} from "./clinicCrud"
import storage from "redux-persist/lib/storage";


export const actionTypes = {
    GetAllClinicTypes:"[Clinic] Get Api",
    LoadClinicTypes: "[Clinic] Load",
}


const initialClinicState = {
    clinicTypes:[],
    clinics:[]
}


export const clinicReducer = persistReducer(
    {storage,key:"clinic",whitelist:["clinicTypes,clinics"]},
    (state= initialClinicState,action) => {
        switch(action.type){
            case actionTypes.GetAllClinicTypes:
                return {...state,loading:true}
            case actionTypes.LoadClinicTypes:
                return {...state,clinicTypes:action.payload,loading:false}
            default:
                return state
        }
    }
)

export const actions = {
    requestClinicTypes: () => ({type:actionTypes.GetAllClinicTypes}),
    loadClinicTypes: (clinicTypes) => ({type:actionTypes.LoadClinicTypes,payload:clinicTypes})
}

export function *saga(){
    yield takeLatest(actionTypes.GetAllClinicTypes,function *clinicTypeSaga(action){
        try{
            const data = yield getClinicTypes();
            yield put(actions.loadClinicTypes(data.data))
        }catch(error){
            console.log(error)
        }
    })
}