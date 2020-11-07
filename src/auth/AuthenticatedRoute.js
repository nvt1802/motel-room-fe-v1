import React from 'react'
import AuthenticationService from './AuthenticationService';
import { Route, Redirect } from 'react-router-dom';

function AuthenticatedRoute(props) {
    if (AuthenticationService.isUserLoggedIn()) {
        return <Route {...props} />
    } else {
        return <Redirect to="/"></Redirect>
    }
}

export default AuthenticatedRoute