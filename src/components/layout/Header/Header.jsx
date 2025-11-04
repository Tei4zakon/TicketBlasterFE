import Navigation from "../../Nav/Navigation.jsx";
import classes from "../../../css/Header.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout.jsx";
import Button from "../../Button/Button.jsx";
import { useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    
    if (value.trim() !== "") {
      navigate(`/search-results?search=${value}`);
    } else {
      navigate("/");
    }
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      if (searchValue.trim() === "") {
        return;
      }
      navigate(`/search-results?search=${searchValue}`);
    }
  };

  return (
    <Layout styles={classes.styles} layout={classes.layout}>
      <div className={classes["header"]}>
        <Navigation />
      </div>
      <div className={classes["header"]}>
        <div className={classes["search-bar"]}>
          <input
            type="text"
            placeholder="Search"
            onChange={handleChange}
            onKeyDown={handleSearch}
            value={searchValue}
          />
        </div>
        {user ? (
          <NavLink to="/cart" className={classes["icon-link"]}>
            <FaShoppingCart className={classes["cart-icon"]} />
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? classes["active-btn"] : undefined
            }
            end
          >
            <Button className={classes.btn}>Login</Button>
          </NavLink>
        )}
        {user ? (
          <NavLink to="/tickets-history" className={classes["icon-link"]}>
            <FaUser className={classes["user-icon"]} />
          </NavLink>
        ) : (
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? classes["active-btn"] : undefined
            }
            end
          >
            <Button className={classes.btn}>Create Account</Button>
          </NavLink>
        )}
      </div>
    </Layout>
  );
};

export default Header;
