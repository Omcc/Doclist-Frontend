import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {put,takeLatest} from "redux-saga/effects";
import {getCountries,getCities,getCounties} from "./adminCrud";



export const actionTypes = {
    GetAllCountriesRequest:"[Country] Get Api",
    LoadCountries:"[Country] Load",
    SelectCountryRequest:"[Country] Select Action Api",
    LoadCities:"[City] Load",
    SelectCityRequest:"[City] Select Action Api",
    LoadCounties:"[County] Load"
}


const initialAddressFields = {
    countries:[],
    cities:[],
    counties:[]
    
}




export const addressFieldReducer = (state=initialAddressFields,action)=>{
    switch(action.type){
        case actionTypes.GetAllCountriesRequest:
            return {...state,loading:true}
        case actionTypes.LoadCountries:
            return {...state,countries:action.payload,loading:false}
        case actionTypes.SelectCountryRequest:
            return {...state,cities:[],counties:[],loading:true,t:true}
        case actionTypes.LoadCities:
            return {...state, cities:action.payload,loading:false}
        case actionTypes.SelectCityRequest:
            return {...state,loading:true}
        case actionTypes.LoadCounties:
            return {...state,counties:action.payload,loading:false}
        
        default:
            return state
    }
}

export const actions ={
    requestCountries: () => ({type:actionTypes.GetAllCountriesRequest}),
    loadCountries: (countries) => ({type:actionTypes.LoadCountries,payload:countries}),
    selectCountry: (country_id) => ({type:actionTypes.SelectCountryRequest,country_id}),
    loadCities: (cities) => ({type:actionTypes.LoadCities,payload:cities}),
    selectCity: (city_id) => ({type:actionTypes.SelectCityRequest,city_id}),
    loadCounties: (counties) => ({type:actionTypes.LoadCounties,payload:counties})

};


export function *saga(){
    yield takeLatest(actionTypes.GetAllCountriesRequest,function *countrySaga(action){
        try{
            const data = yield getCountries();
            
            yield put(actions.loadCountries(data.data))
        }catch(error){
            console.log(error)
        }
    })
    yield takeLatest(actionTypes.SelectCountryRequest,function *citySaga(action){
        try{
            
            const data = yield getCities(action.country_id);
            
            yield put(actions.loadCities(data.data))
        }catch(error){
            console.log(error)
        }
    })
    yield takeLatest(actionTypes.SelectCityRequest,function *countySaga(action){
        try{
            const data = yield getCounties(action.city_id);
            
            yield put(actions.loadCounties(data.data))
        }catch(error){
            console.log(error)
        }
    })
}
