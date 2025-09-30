import React from "react";
import { Link } from "react-router-dom";
//import { useDispatch } from 'react-redux';
import "./../css/Nav.css";

const Nav = () => {
  //   const isLoggedIn = window.location.pathname === "/login";

  return (
    <ul id="nav-bar">
      <li id="ticket-blaster">
        <Link to="/">ticketblaster</Link>
      </li>
      <li id="concerts">
        <Link to="/musical-concerts">Musical Concerts</Link>
      </li>
      <li id="comedy">
        <Link to="/stand-up-comedy">Stand-up Comedy</Link>
      </li>
      <li id="account">
        <Link to="/create-account">Create Account</Link>
      </li>
      <li id="login">
        <Link to="/login">Log In</Link>
      </li>
      <li id="search">
        <Link to="/search">Search</Link>
      </li>
      {/* {isLoggedIn && (
        <>
          <li id="login">
            <Link to="/login">Log In</Link>
          </li>
          <li id="search">
            <Link to="/search">Search</Link>
          </li>
        </>
      )} */}
    </ul>
  );
};

export default Nav;
