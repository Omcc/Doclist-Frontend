import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {put,takeLatest,take, call, fork,select} from "redux-saga/effects";
import {getUserByToken,login,fetch,post,remove,putRequest,CLINIC_BASIC,CLINIC_STAFFS} from "./authCrud"
import { push } from 'connected-react-router';
import * as selectors from "./selectors"
import {fetchAll as fetchAllAdmin} from "modules/Administration/_redux/adminRedux"


export const actionTypes = {
    LoginRequest:"[Login] Auth API",
    Login:"[Login] Action",
    Logout:"[Logout] Action",
    Register:"[Register] Action",
    UserRequested:"[Request User] Action",
    UserLoaded: "[Load User] Auth API",
    RequestClinic:"[Clinic] Request API",
    LoadClinic:"[Clinic] Load",
    RequestStaffs:"[Clinic-Staff] Request API",
    LoadStaffs:"[Clinic-Staff] Load",
    ReceiveData:"[Auth] Receive Data",
    LoginSuccess:"[Login] Success",
    LoginFail:"[Login] Fail",
    CreateStaffRequest:"[Staff] Create Request",
    CreateStaffSuccess:"[Staff] Create Success",
    CreateStaffFail:"[Staff] Create Fail",
    DeleteStaffRequest:"[Staff] Delete Request",
    DeleteStaffSuccess:"[Staff] Delete Success",
    DeleteStaffFail:"[Staff] Delete Fail",
    UpdateStaffRequest:"[Staff] Update Request",
    UpdateStaffSuccess:"[Staff] Update Success",
    UpdateStaffFail:"[Staff] Update Fail",
    
    
};

const initialAuthState = {
    user:undefined,
    authToken:undefined,
    success:null,
    
}

export const reducer = persistReducer(
    {storage, key:"clinic-auth",whitelist:["user","authToken","clinic_id","data","success"]},
    (state = initialAuthState,action) => {
        switch (action.type){
            case actionTypes.LoginRequest:
                return {...state,loading:true}
            case actionTypes.Login: {
                const {authToken,clinic_id,user} = action.payload;
                return {authToken,clinic_id,user:user,loading:true};
            }
            case actionTypes.Register: {
                const {authToken} = action.payload;
                return {authToken,user:undefined}
            }

            case actionTypes.Logout: {
                return initialAuthState;
            }

            case actionTypes.UserLoaded: {
                const {user} = action.payload;
                return {...state,user};
            }
            case actionTypes.RequestClinic:{
                return {...state,loading:true}
            }
            case actionTypes.LoadClinic:{
                return {...state,loading:false,clinic:action.clinic}
            }
            case actionTypes.RequestStaffs:{
                return {...state,loading:true}
            }
            case actionTypes.LoadStaffs:{
                return {...state,loading:false,staffs:action.payload}
            }
            case actionTypes.ReceiveData:{
                

                return {...state,data:{...state.data,[action.payload.key]:action.payload.value}}
            }
            case actionTypes.LoginSuccess:{
                return {...state,success:true}
            }
            case actionTypes.LoginFail:{
                return {error:action.error}
            }
            case actionTypes.CreateStaffRequest:{
                return {...state,loading:true}
            }
            case actionTypes.CreateStaffSuccess:{
                return {...state,loading:false}
            }
            case actionTypes.DeleteStaffRequest:{
                return {...state,loading:true}
            }
            case actionTypes.DeleteStaffSuccess:{
                return {...state,loading:false}
            }

            case actionTypes.UpdateStaffRequest:{
                return {...state,loading:true}
            }
            case actionTypes.UpdateStaffSuccess:{
                return {...state,loading:false}
            }
            
            default:
                return state;
        }
    }
)



export const actions = {

    loginRequest: (email,password) => ({ type: actionTypes.LoginRequest,email,password}),
    login: (authToken,clinic_id,user) => ({ type: actionTypes.Login, payload: { authToken ,clinic_id , user} }),
    register: authToken => ({
      type: actionTypes.Register,
      payload: { authToken }
    }),
    logout: () => ({ type: actionTypes.Logout }),
    requestUser: user => ({ type: actionTypes.UserRequested, payload: { user } }),
    fulfillUser: user => ({ type: actionTypes.UserLoaded, payload: { user } }),
    requestClinic:(clinic_id) => ({type:actionTypes.RequestClinic,clinic_id}),
    loadClinic:(clinic) => ({type:actionTypes.LoadClinic,payload:clinic}),
    receiveData: (data) => ({type:actionTypes.ReceiveData,payload:data}),
    loginSuccess:() => ({type:actionTypes.LoginSuccess}),
    loginFail:(error) => ({type:actionTypes.LoginFail,error:error}),
    createStaffRequest: (firstname,lastname) => ({type:actionTypes.CreateStaffRequest,firstname,lastname}),
    createStaffSuccess:() => ({type:actionTypes.CreateStaffSuccess}),
    deleteStaffRequest: (staffId) => ({type:actionTypes.DeleteStaffRequest,staffId}),
    deleteStaffSuccess:() => ({type:actionTypes.DeleteStaffSuccess}),
    updateStaffRequest: (staffId,body) => ({type:actionTypes.UpdateStaffRequest,staffId,body}),
    updateStaffSuccess:() => ({type:actionTypes.UpdateStaffSuccess})
    
    
  };


  function *fetchAll(params){
     
     const clinic = yield fork(fetchResource,CLINIC_BASIC,params)
     const staffs = yield fork(fetchResource,CLINIC_STAFFS,params)
     yield fork(fetchAllAdmin)
     

  }


function* fetchResource(resource,params){
    const {data} = yield call(fetch,resource,params)
    yield put(actions.receiveData({key:[resource],value:data}))

}

function* postResource(resource,params,body){
    const {data} = yield call(post,resource,params,body)
    console.log(data)
    return data;

}

function* deleteResource(resource,params){
    const {data} = yield call(remove,resource,params)
    
}

function* authUser(action){

        const data = yield login(action.email,action.password);

        const user = {
            email:data.data.email,
            name:data.data.name,
        }
        
        yield put(actions.login(data.data.access,data.data.clinic_id,user))

        return data.data
  

}

function *refreshStaffs(){

    const clinicId = yield select(selectors.clinicId)
    const params={clinicId:clinicId}
    const staffs = yield fork(fetchResource,CLINIC_STAFFS,params)
}




export function* saga(){
    yield takeLatest(actionTypes.LoginRequest,function* loginSaga(action){

        try{
            const data = yield call(authUser,action)
            
            const params = {clinicId:data.clinic_id}
            yield call(fetchAll,params)

            yield put(actions.loginSuccess())
            
        }
        catch(error){
            console.log("fail")
            //yield put(actions.loginFail(error))
        }
        
    })



    yield takeLatest(actionTypes.CreateStaffRequest,function *createStaffSaga(action){

        
        console.log(selectors.clinicId)

        const clinicId = yield select(selectors.clinicId)
        const params={clinicId:clinicId}
        const body = {
            clinic:clinicId,
            firstname:action.firstname,
            lastname:action.lastname
        }

        try{
            yield call(postResource,CLINIC_STAFFS,params,body)
            yield put(actions.createStaffSuccess())
        }catch(error){
            console.log(error)
        }

        
            
        
    })

    yield takeLatest(actionTypes.CreateStaffSuccess,function *refreshStaffs(){

        const clinicId = yield select(selectors.clinicId)
        const params={clinicId:clinicId}
        const staffs = yield fork(fetchResource,CLINIC_STAFFS,params)
    })

    yield takeLatest(actionTypes.DeleteStaffRequest,function *deleteStaffSaga(action){

        const clinicId = yield select(selectors.clinicId)

        const params = {
            clinicId,
            staffId:action.staffId
        }
        try{
            yield call(deleteResource,CLINIC_STAFFS,params)
            yield put(actions.deleteStaffSuccess())
        }catch(error){
            console.log(error)
        }
    })

    

    yield takeLatest(actionTypes.UpdateStaffRequest,function *updateStaffSaga(action){

        console.log(action)

        const clinicId = yield select(selectors.clinicId)
     
        

        const params = {
            clinicId,
            staffId:action.staffId
        }

        const body = action.body
        
        
        try{
            yield call(putRequest,CLINIC_STAFFS,params,body)
            yield put(actions.updateStaffSuccess())
        }catch(error){
            console.log(error)
        }
    })

    yield takeLatest([actionTypes.DeleteStaffSuccess,actionTypes.UpdateStaffSuccess],refreshStaffs)

    
    
   


}