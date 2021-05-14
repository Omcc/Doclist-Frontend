import {all} from "redux-saga/effects";
import {combineReducers} from "redux";


import * as auth from "modules/Auth/_redux/authRedux"
import * as administration from "modules/Administration/_redux/adminRedux"
import * as clinic from "modules/Clinic/_redux/clinicRedux"

export const rootReducer = combineReducers({
    auth:auth.reducer,
    addressFields:administration.addressFieldReducer,
    clinic:clinic.clinicReducer
});


export function* rootSaga(){
    yield all([auth.saga(),administration.saga(),clinic.saga()]);
}