import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {put,takeLatest} from "redux-saga/effects";
import {getUserByToken,login} from "./authCrud"


export const actionTypes = {
    LoginRequest:"[Login] Auth API",
    Login:"[Login] Action",
    Logout:"[Logout] Action",
    Register:"[Register] Action",
    UserRequested:"[Request User] Action",
    UserLoaded: "[Load User] Auth API"
};

const initialAuthState = {
    user:undefined,
    authToken:undefined
}

export const reducer = persistReducer(
    {storage, key:"clinic-auth",whitelist:["user","authToken"]},
    (state = initialAuthState,action) => {
        switch (action.type){
            case actionTypes.LoginRequest:
                return state
            case actionTypes.Login: {
                const {authToken} = action.payload;
                return {authToken,user:undefined};
            }
            case actionTypes.Register: {
                const {authToken} = action.payload;
                return {authToken,user:undefined}
            }

            case actionTypes.Logout: {
                return initialAuthState;
            }

            case actionTypes.userLoaded: {
                const {user} = action.payload;
                return {...state,user};
            }
            default:
                return state;
        }
    }
)



export const actions = {

    loginRequest: (email,password) => ({ type: actionTypes.LoginRequest,email,password}),
    login: authToken => ({ type: actionTypes.Login, payload: { authToken } }),
    register: authToken => ({
      type: actionTypes.Register,
      payload: { authToken }
    }),
    logout: () => ({ type: actionTypes.Logout }),
    requestUser: user => ({ type: actionTypes.UserRequested, payload: { user } }),
    fulfillUser: user => ({ type: actionTypes.UserLoaded, payload: { user } })
  };


export function* saga(){
    yield takeLatest(actionTypes.LoginRequest,function* loginSaga(action){

        try{
            const data = yield login(action.email,action.password);
            console.log(data.data.access)
            yield put(actions.login(data.data.access))
        }
        catch(error){
            console.log(error)
        }
        
    })
    yield takeLatest(actionTypes.Login,function* loginSaga(){
        yield put(actions.requestUser());
    });

    yield takeLatest(actionTypes.Register,function* registerSaga(){
        yield put(actions.requestUser());
    })

    yield takeLatest(actionTypes.UserRequested,function* userRequested(){
       
        yield put(actions.fulfillUser({"test":"test"}));
    })



}