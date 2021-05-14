import {all} from "redux-saga/effects";
import {combineReducers} from "redux";


import * as auth from "modules/Auth/_redux/authRedux"
import * as administration from "modules/Administration/_redux/adminRedux"

export const rootReducer = combineReducers({
    auth:auth.reducer,
    addressFields:administration.addressFieldReducer 
});


export function* rootSaga(){
    yield all([auth.saga(),administration.saga()]);
}