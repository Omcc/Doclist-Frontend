import {persistReducer} from "redux-persist";
import {put,takeLatest} from "redux-saga/effects";
import {getClinicTypes,createClinic} from "./clinicCrud"
import storage from "redux-persist/lib/storage";


export const actionTypes = {
    GetAllClinicTypes:"[Clinic Types] Get Api",
    LoadClinicTypes: "[Clinic Types] Load",
    CreateClinicRequest:"[Clinic] Create Request",
    CreateClinicSuccess:"[Clinic] Create Success",
    CreateClinicFail:"[Clinic] Create Fail",
   

}


const initialClinicState = {
    clinicTypes:[],
    clinics:""
    
   
}


export const clinicReducer = persistReducer(
    {storage,key:"clinic",whitelist:["clinicTypes,clinics"]},
    (state= initialClinicState,action) => {
        switch(action.type){
            case actionTypes.GetAllClinicTypes:
                return {...state,loading:true}
            case actionTypes.LoadClinicTypes:
                return {...state,clinicTypes:action.payload,loading:false}
            case actionTypes.CreateClinicRequest:
                return {...state,clinicCreate:{loading:true}}
            case actionTypes.CreateClinicSuccess:
                return {...state,clinicCreate:{loading:false,success:true,response:action.payload}}
            case actionTypes.CreateClinicFail:
                return {...state,clinicCreate:{loading:false,success:false,error:action.error}}
            default:
                return state
        }
    }
)

export const actions = {
    requestClinicTypes: () => ({type:actionTypes.GetAllClinicTypes}),
    loadClinicTypes: (clinicTypes) => ({type:actionTypes.LoadClinicTypes,payload:clinicTypes}),
    requestClinicCreate:(body) => ({type:actionTypes.CreateClinicRequest,body:body}),
    clinicCreateSuccess:(response) => ({type:actionTypes.CreateClinicSuccess,payload:response}),
    clinicCreateFail:(error) =>({type:actionTypes.CreateClinicFail,error:error})

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

    yield takeLatest(actionTypes.CreateClinicRequest,function *clinicCreateSaga(action){
        try{
            console.log("saga test")
            const response = yield createClinic(action.body);
            console.log(response)
            yield put(actions.clinicCreateSuccess(response.data))
        }catch(error){
            
            yield put(actions.clinicCreateFail(error.response.data))
        }

    })
}