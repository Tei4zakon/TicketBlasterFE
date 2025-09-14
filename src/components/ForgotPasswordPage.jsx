import React from 'react';
import { Link } from 'react-router';
import './../css/ForgotPasswordPage.css'


const ForgotPasswordPage = () => {

    return(
        <div id='forgot-password-page'>
            <h1>Forgot Password</h1>
            <p>Email</p>
                <input id='email-placeholder'
                type='text'
                placeholder=''></input>
                <br/>
                <br/>
            <p id='reset-pw-link'><Link to='/login/forgot-password/reset-password'>Send password reset email</Link></p>
            <br/>
            <p id='back-to-login'><Link to='/login'>Back to login</Link></p>
        </div>
    )
}

export default ForgotPasswordPage