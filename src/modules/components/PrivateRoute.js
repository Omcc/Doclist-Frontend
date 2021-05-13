
import React from 'react';
import {useSelector,shallowEqual} from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


export const PrivateRoute = ({component: Component, ...rest}) => {

    

    const {isAuthorized} = useSelector(
        ({auth}) => ({
            isAuthorized: auth.authToken != null,
        }),
        shallowEqual
    );

    

    
    
    return (
        
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isAuthorized ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

