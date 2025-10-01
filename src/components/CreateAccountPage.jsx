import axios from 'axios';
import React from 'react';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import './../css/CreateAccountPage.css';



const CreateAccountPage = () => {
   
    const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleCreateAccount = async (e) => {
    e.preventDefault();

    const {fullName, email, password, confirmPassword} = formData;

    if (password !== confirmPassword){
        console.log("Passwords don't match!")
        setError("Passwords don't match!");
        return;
    }
    try {
        await axios.post(
            "http://localhost:2741/create-account",
            {fullName, email, password, confirmPassword},
            { headers: { "Content-Type": "application/json" } },
      );

      navigate("/login");

    } catch (err) {
      console.log(err);
      setError("Server erorr!");
    };
};

    return(
        <div id='create-account-page'>
        <h1>Create Account</h1>
        <form className='create-account' onSubmit={handleCreateAccount}>
        <p>Full Name</p>
            <input id='full-name-placeholder' 
            type='text' 
            placeholder=''
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}></input>
        <p>Email</p>
            <input id='email-placeholder'
                type='text'
                placeholder=''
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}></input>
        <p>Password</p>
            <input id='password-placeholder'
                type='password'
                placeholder=''
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}>
            </input>
        <p>Re-type Password</p>
            <input id='password-placeholder'
                type='password'
                placeholder=''
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}>
            </input>
        <p><button id='create-acc-btn'>Create Account</button></p>
        <br/>
        <br/>
        <p id='create-account'><Link to='/login'>Already have an account?</Link></p>
        </form>
        </div>
    )
}

export default CreateAccountPage;

