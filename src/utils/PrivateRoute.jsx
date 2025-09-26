
import React from 'react';
import {Outlet,Navigate} from 'react-router';
import {useSelector} from 'react-redux';
import {getToken} from './../config/StorageFunctions';

const PrivateRoute = ({redirectPath='/login',children}) =>{
    const token = useSelector(state=>state.authReducer.token)
    const localStorageToken = getToken();
    if(!token && !localStorageToken){
        return <Navigate to={redirectPath}/>
    }
    return children ? children : <Outlet/>
};

export default PrivateRoute
