import {LOGIN_FAILED,LOGIN_SUCCESS,LOGOUT_USER} from './constants';

export const logInSuccess = (data) =>{
    return{
        type:LOGIN_SUCCESS,
        payload:data
    }
}

export const logInFailed = (err) => {
    return{
        type:LOGIN_FAILED,
        payload:err
    }
}

export const logOutUser = () => {
    return{
        type:LOGOUT_USER,
        payload: "Logged Out"
    }
}