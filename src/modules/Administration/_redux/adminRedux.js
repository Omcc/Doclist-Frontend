import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {put,takeLatest} from "redux-saga/effects";
import {getCountries,getCities} from "./adminCrud";



export const actionTypes = {
    GetAllCountriesRequest:"[Country] Get Api",
    LoadCountries:"[Country] Load",
    SelectCountryRequest:"[Country] Select Action Api",
    LoadCities:"[City] Load",
}


const initialAddressFields = {
    countries:[],
    cities:[]
    
}

console.log(initialAddressFields)


export const addressFieldReducer = (state=initialAddressFields,action)=>{
    switch(action.type){
        case actionTypes.GetAllCountriesRequest:
            return {...state,loading:true}
        case actionTypes.LoadCountries:
            return {...state,countries:action.payload,loading:false}
        case actionTypes.SelectCountryRequest:
            return {...state,loading:true}
        case actionTypes.LoadCities:
            return {...state, cities:action.payload,loading:false}
        
        default:
            return state
    }
}

export const actions ={
    requestCountries: () => ({type:actionTypes.GetAllCountriesRequest}),
    loadCountries: (countries) => ({type:actionTypes.LoadCountries,payload:countries}),
    selectCountry: (country_id) => ({type:actionTypes.SelectCountryRequest,country_id}),
    loadCities: (cities) => ({type:actionTypes.LoadCities,payload:cities})

};


export function *saga(){
    yield takeLatest(actionTypes.GetAllCountriesRequest,function *countrySaga(action){
        try{
            const data = yield getCountries();
            console.log(data);
            yield put(actions.loadCountries(data.data))
        }catch(error){
            console.log(error)
        }
    })
    yield takeLatest(actionTypes.SelectCountryRequest,function *citySaga(action){
        try{
            console.log(action.country_id)
            const data = yield getCities(action.country_id);
            console.log(data);
            yield put(actions.loadCities(data.data))
        }catch(error){
            console.log(error)
        }
    })
}
