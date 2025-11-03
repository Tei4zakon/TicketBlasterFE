
import classes from "../css/User.module.css";
import Button from "./Button/Button.jsx";
import { getImageUrl } from "../utils/imageUrl.js";

const User = (props) => {
  return (
    <div className={classes.user}>
      <div className={classes["user-details"]}>
        <div className={classes["img-container"]}>
          <img
            src={
              props.img
                ? getImageUrl(props.img)
                : "https://placehold.co/200x200/e8e8e8/555?text=User"
            }
            alt="profile-avatar"
          />
        </div>
        <div>
          <h3 className={classes.h3}>{props.fullName}</h3>
          <span className={classes.email}>{props.email}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <Button
          className={`${classes.btn} ${
            props.admin ? classes["admin-btn"] : classes["user-btn"]
          }`}
          onClick={() =>
            props.admin
              ? props.handleShowUserModal()
              : props.handleShowAdminModal()
          }
        >
          {props.admin ? "Make User" : "Make Admin"}
        </Button>
        <Button
          className={`${classes["delete-btn"]} ${classes.btn}`}
          onClick={props.handleShowDeleteModal}
        >
          Delete User
        </Button>
      </div>
    </div>
  );
};

export default User;
