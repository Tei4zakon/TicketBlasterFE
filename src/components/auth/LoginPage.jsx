import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import {logIntoApp} from './duck/operations';
import { decodeToken } from "react-jwt";


import '../../css/LoginPage.css';
//import CreateAccountPage from './CreateAccountPage';


const LoginPage = () => {
    
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(logIntoApp({ email, password }));


      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        const decoded = decodeToken(res.data.token);
        if (decoded.role === "admin") {
          navigate("/");
        } else {
          navigate("/ticket-history");
        }
      } else {
        setError(res.data.error || "Login error!");
      }
    } catch (err) {
      console.error("Login error:", err.response ? err.response.data : err.message);
  setError(err.response?.data?.error || "Login failed, please try again");
    }
  };


    return(       
    
           <div id='login-page'> 
           <h1>Log In</h1>
           <form onSubmit={handleSubmit}>
            <label id='email'>Email</label>
                <input id='email-placeholder'
                type='text'
                placeholder=''
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required></input>
            <label id='password'>Password</label>
                <input id='password-placeholder'
                type='password'
                placeholder=''
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required></input>
                {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
            <p id='forgot-password'>
                <Link to='/login/forgot-password'>
                    <u>Forgot password?</u></Link>
                    <button id='login-btn' type='submit'>Log in</button>
            </p>
            <p id='create-account'><Link to='/create-account'>Don't have an account?</Link></p>
            
           </form>
           </div>
      
    )
}

export default LoginPage;