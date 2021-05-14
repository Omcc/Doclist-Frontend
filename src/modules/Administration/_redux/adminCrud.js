import axios from "axios"

export const COUNTRY_URL = "http://localhost:8001/api/administration/countries/"
export const CITY_URL = (country_id) =>  `http://localhost:8001/api/administration/countries/${country_id}/cities/`


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
