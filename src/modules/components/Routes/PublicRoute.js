
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useSelector,shallowEqual} from 'react-redux';


const PublicRoute = ({component: Component, restricted,redirectPath, ...rest}) => {

    const {isAuthorized} = useSelector(
        ({auth}) => ({
            isAuthorized: auth.success != null,
        }),
        shallowEqual
    );
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            isAuthorized && restricted ?
                <Redirect to={redirectPath} />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;