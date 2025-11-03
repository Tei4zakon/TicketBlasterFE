import { NavLink } from "react-router-dom";
import classes from "../../css/Navigation.module.css";
import logo from "../../assets/ticketblaster-logo.svg";

function Navigation() {
  return (
    <>
      <NavLink to="/">
        <img 
          src={logo} 
          alt="TicketBlaster Logo" 
          className={classes.logo}
          width="151"
          height="24"
        />
      </NavLink>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/musical-concerts"
              className={({ isActive }) =>
                isActive ? classes["active-li"] : undefined
              }
              end
            >
              Musical Concerts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/comedy-shows"
              className={({ isActive }) =>
                isActive ? classes["active-li"] : undefined
              }
              end
            >
              Stand-up Comedy
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navigation;
