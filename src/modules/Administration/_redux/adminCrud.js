import axios from "axios"
import {getAbsoluteApiUrl} from "modules/Helper"

export const LOGIN_URL=getAbsoluteApiUrl("/api/auth/token/")

const BASE_URL = process.env.REACT_APP_API_BASE_URL

export const COUNTRY_URL = getAbsoluteApiUrl(`/api/administration/countries/`)
export const CITY_URL = (country_id) =>  getAbsoluteApiUrl(`/api/administration/countries/${country_id}/cities/`)
export const COUNTY_URL = (city_id) => getAbsoluteApiUrl(`/api/administration/cities/${city_id}/counties/`)

export function getCountries(){
    const config = {
        headers:{
            'Content-type':'application/json'
        }
    }
    return axios.get(COUNTRY_URL,config)

}

export function getCities(country_id){
    const config = {
        headers:{
            'Content-type':'application/json'
        }
    }
    console.log(CITY_URL(country_id))

    return axios.get(CITY_URL(country_id))
}

export function getCounties(city_id){
    const config = {
        headers:{
            'Content-type':'application/json'
        }
    }
    return axios.get(COUNTY_URL(city_id))
}
