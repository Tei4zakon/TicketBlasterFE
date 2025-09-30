import React from "react";
import { Link } from "react-router-dom";
import './../css/ResetPasswordPage.css'


const ResetPasswordPage = () => {

    return(

        <div id="reset-pw-page">
            <h1>Reset Password</h1>
            <p>Password</p>
            <input id='password-placeholder'
                type='password'
                placeholder=''></input>
        <p>Re-type Password</p>
            <input id='password-placeholder'
                type='password'
                placeholder=''></input>
        <br/>
        <br/>
        <p><button id='reset-pw-btn'>Reset Password</button></p>
        <br/>
        <p id='back-to-login'><Link to='/login'>Back to login</Link></p>
        </div>
    )
}

export default ResetPasswordPage