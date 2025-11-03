import classes from "../css/CartElement.module.css";
import Button from "./Button/Button.jsx";
import { getImageUrl } from "../utils/imageUrl.js";

const CartElement = (props) => {
  const handleRemoveClick = () => {
    props.handleRemove(props.id);
  };

  const handleClick = () => {
    props.onPrint(props.event, props.qrcode);
    props.openModal(true);
  };

  return (
    <>
      <div className={`${classes["cart-item"]} ${props.smaller ? classes['smaller'] : ''}`}>
        <div
          className={`${classes.flex} ${
            props.smaller ? classes["smaller-gap"] : classes["big-gap"]
          }`}
        >
          <div
            className={
              props.smaller
                ? classes["smaller-img-container"]
                : classes["img-container"]
            }
          >
            <img src={getImageUrl(props.img)} alt="event" />
          </div>
          <div className={classes.left}>
            <h2>{props.eventName}</h2>
            <span className={classes.date}>{props.date}</span>
            <span className={classes.location}>
              {props.city}, {props.country}
            </span>
          </div>
        </div>
        {props.smaller && props.onPrint ? <div className={classes["right-wrapper"]}>
        <div className={classes["text-right"]}>
          <div className={classes.price}>
            ${(props.quantity * props.price).toFixed(2)} USD
          </div>
          <span className={classes.date}>
            {props.quantity} x $
            {props.price !== undefined && props.price !== null
              ? props.price.toFixed(2)
              : ""}{" "}
            USD
          </span>
        </div>
            <Button className={classes.btn} onClick={handleClick}>
              Print
            </Button>
        </div> : <div className={classes.right}>
          <div className={classes.price}>
            ${(props.quantity * props.price).toFixed(2)} USD
          </div>
          <span className={classes.date}>
            {props.quantity} x $
            {props.price !== undefined && props.price !== null
              ? props.price.toFixed(2)
              : ""}{" "}
            USD
          </span>
          {!props.button && (
            <Button className={classes.btn} onClick={handleRemoveClick}>
              Remove
            </Button>
          )}
        </div> }
      </div>
    </>
  );
};

export default CartElement;
