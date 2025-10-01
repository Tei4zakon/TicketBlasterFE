
import React from 'react';
import {Outlet,Navigate} from 'react-router-dom';
import {getToken} from './../config/StorageFunctions';
import { isExpired } from 'react-jwt';

const PrivateRoute = ({redirectPath='/login',children}) =>{

    const localStorageToken = getToken();
    if(!localStorageToken || isExpired(localStorageToken)){
        return <Navigate to={redirectPath}/>
    }
    return children ? children : <Outlet/>
};

export default PrivateRoute
