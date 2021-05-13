import React from 'react'
import { Redirect, Switch, Route } from "react-router-dom";
import {shallowEqual, useSelector } from "react-redux";
import AuthPage  from "modules/Auth/pages/AuthPage";
import Admin from "layouts/Admin2"
import Client from "layouts/Client"
import {PrivateRoute} from "modules/components/PrivateRoute"

export default function MainRoutes() {
    

   

    return (

        <Switch>
            
            <PrivateRoute component = {Admin} path="/admin" />
            <Route component={Client} path="/" />
        </Switch>
        
    )
}
