import React from 'react';
import ReactDOM from 'react-dom/client'; // or 'react-dom' for older versions
import App from './components/App';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import LoginPage from './components/LoginPage';
import CreateAccountPage from './components/CreateAccountPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ResetPasswordPage from './components/ResetPasswordPage';
//import { Provider } from "react-redux";


    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
    <Router>
        <Routes>
            <Route path='/' element={<App/>}>
                <Route path='/login' element={<LoginPage/>}></Route>
                <Route path='/create-account' element={<CreateAccountPage/>}></Route>
                <Route path='login/forgot-password' element={<ForgotPasswordPage/>}></Route>
                <Route path='login/forgot-password/reset-password' element={<ResetPasswordPage/>}></Route>
                
            </Route>
            
            
        </Routes>
    </Router>
    );