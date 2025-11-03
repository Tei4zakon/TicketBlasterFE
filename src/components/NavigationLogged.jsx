import { NavLink } from "react-router-dom";
import classes from "../css/NavigationLogged.module.css";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice.js";
import Title from "./Title/Title.jsx";
import { decodeAdmin } from "../helpers/jwt.jsx";
import Button from "./Button/Button.jsx";

function NavigationLogged(props) {
  const dispatch = useDispatch();
  const admin = decodeAdmin();
  const checkCreateEvent = window.location.pathname.includes("/events");

  return (
    <div className={classes.container}>
      <div className={classes.flex}>
        <Title>{props.header}</Title>
        {props.btn && (
          <NavLink to="create-event">
            <Button className={classes.button}>Create Event</Button>
          </NavLink>
        )}
      </div>
      <div className={classes["profile-nav"]}>
        {admin && (
          <NavLink
            to="/events"
            className={() => {
              return checkCreateEvent ? classes["active"] : undefined;
            }}
            end
          >
            Events
          </NavLink>
        )}
        {admin && (
          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive ? classes["active"] : undefined
            }
            end
          >
            Users
          </NavLink>
        )}
        <NavLink
          to="/tickets-history"
          className={({ isActive }) =>
            isActive ? classes["active"] : undefined
          }
          end
        >
          Tickets History
        </NavLink>
        <NavLink
          to="/user-details"
          className={({ isActive }) =>
            isActive ? classes["active"] : undefined
          }
          end
        >
          User Details
        </NavLink>
        <NavLink to="/">
          <button className={classes.btn} onClick={() => dispatch(logout())}>
            Log Out
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default NavigationLogged;
