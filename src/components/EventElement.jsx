
import classes from "../css/EventElement.module.css";
import { useNavigate } from "react-router-dom";
import Button from "./Button/Button.jsx";
import { getImageUrl } from "../utils/imageUrl.js";

function EventElement(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (props.text === "Print") {
      props.onPrint(props.event, props.qrcode);
      props.openModal();
      return;
    }
    navigate(`/event-details/${props.id}`);
  };

  return (
    <div className={`${classes["event-item"]} ${props.className}`}>
      <div className={classes["img-container"]}>
        <img
          src={
            props.img
              ? getImageUrl(props.img)
              : "https://placehold.co/600x400/e8e8e8/e8e8e8"
          }
          alt="event"
        />
      </div>
      <div className={classes.desc}>
        <h2>{props.eventName}</h2>
        {!props.datePlacementAfterDesc && (
          <span className={classes.date}>{props.date}</span>
        )}
        <p>{props.description}</p>
        <div className={classes["flex-space-between"]}>
          <div className={classes["flex-column"]}>
            {props.datePlacementAfterDesc && (
              <span className={classes.date}>{props.date}</span>
            )}
            <span>
              {props.city}, {props.country}
            </span>
          </div>
          <Button className={classes.btn} onClick={handleClick}>
            {props.text}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EventElement;
