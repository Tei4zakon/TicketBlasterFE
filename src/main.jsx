import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import store from "./store.jsx";
import App from "./components/App";
import LoginPage from "../src/components/auth/LoginPage.jsx";
//import LoggedUser from "./components/LoggedUserPage.jsx";
import CreateAccountPage from "./components/CreateAccountPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import ResetPasswordPage from "./components/ResetPasswordPage";
import { Events } from "./components/events/index.jsx";
import PrivateRoute from "./utils/PrivateRoute.jsx";
import LoggedUser from "./components/LoggedUserPage.jsx";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/login" index element={<LoginPage />} />
        <Route path="/events" element={<Events />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        >
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path='/reset-password' element={<ResetPasswordPage/>} />
          <Route path="/user" element={<LoggedUser/>}>
            <Route path="/user/ticket-history" />
            <Route path="/user/user-details" />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  </Provider>
);
