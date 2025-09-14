import axios from 'axios';
import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router';
import { decodeToken } from "react-jwt";
import './../css/LoginPage.css'
//import CreateAccountPage from './CreateAccountPage';


const LoginPage = () => {
    
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:2741/api/v1/login",
                { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      // { success: true, token: "nasiot token" }

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        const decoded = decodeToken(res.data.token);
        if (decoded.role === "admin") {
          navigate("/");
        } else {
          navigate("/create-account");
        }
      } else {
        setError(res.data.error || "Login error!");
      }
    } catch (err) {
      console.log(err);
      setError("Server erorr!");
    }
  };


    return(       
    
           <div id='login-page'> 
           <h1>Log In</h1>
           <form className='form-container' onSubmit={handleSubmit}>
            <p>Email</p>
                <input id='email-placeholder'
                type='text'
                placeholder=''
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required></input>
            <p>Password</p>
                <input id='password-placeholder'
                type='password'
                placeholder=''
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required></input>
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