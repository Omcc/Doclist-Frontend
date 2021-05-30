import axios from "axios"
import {getAbsoluteApiUrl} from "modules/Helper"

export const LOGIN_URL=getAbsoluteApiUrl("/api/auth/token/")

const BASE_URL = process.env.REACT_APP_API_BASE_URL

export const COUNTRY_URL = getAbsoluteApiUrl(`/api/administration/countries/`)
export const CITY_URL = (country_id) =>  getAbsoluteApiUrl(`/api/administration/countries/${country_id}/cities/`)
export const COUNTY_URL = (city_id) => getAbsoluteApiUrl(`/api/administration/cities/${city_id}/counties/`)
const SPEC_URL = getAbsoluteApiUrl('/api/administration/specs/')
const LANG_URL = getAbsoluteApiUrl('/api/administration/languages/')
const JOB_URL = getAbsoluteApiUrl('/api/administration/jobs')
const TITLE_URL = getAbsoluteApiUrl('/api/administration/titles')
// api constants - store keys
export const COUNTRIES="coLANG_URLuntries"
export const CITIES = "cities"
export const COUNTIES = "counties"

export const LANGUAGES = "languages"
export const SPECIALIZATIONS="specializations"
export const JOBS = "jobs"
export const TITLES = "titles"



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


export function fetch(resource,params){
    console.log(resource)
    switch(resource){
        case LANGUAGES:
            return axios.get(LANG_URL)
        case SPECIALIZATIONS:
            return axios.get(SPEC_URL)
        case JOBS:
            return axios.get(JOB_URL)
        case TITLES:
            return axios.get(TITLE_URL)
    }
}