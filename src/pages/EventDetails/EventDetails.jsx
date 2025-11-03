import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../../css/EventDetails.module.css";
import EventElement from "../../components/EventElement.jsx";
import Button from "../../components/Button/Button.jsx";
import { formatTime } from "../../helpers/formatTime.jsx";
import Title from "../../components/Title/Title.jsx";
import { decodeJwt } from "../../helpers/jwt.jsx";
import { useSelector } from "react-redux";
import { eventsService, ticketsService } from "../../services/index.js";
import { getImageUrl } from "../../utils/imageUrl.js";

const EventDetails = () => {
  const user = useSelector((state) => state.auth.user);
  const [event, setEvent] = useState({});
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  const eventId = window.location.pathname.split("/").pop();
  useEffect(() => {
    const loadEventDetails = async () => {
      try {
        console.log(`[EVENT_DETAILS] Loading details for event: ${eventId}`);
        const response = await eventsService.fetchEventById(eventId);
        const event = response.data;
        setEvent(event);
        console.log(`[EVENT_DETAILS] Loaded event details: ${event.eventName}`);
      } catch (error) {
        console.error(`[EVENT_DETAILS] Failed to load event details for ID: ${eventId}`, error);
      }
    };
    loadEventDetails();
  }, [eventId]);

  const userId = decodeJwt();

  const handleAddToCart = async () => {
    if (!user) {
      localStorage.setItem(
        "redirectedFromItem",
        JSON.stringify({ event: event._id, quantity })
      );
      navigate("/login");
      return;
    }
    try {
      const quantityNumber = parseFloat(quantity);
      console.log(`[EVENT_DETAILS] Adding ${quantityNumber} tickets to cart for event: ${event.eventName}`);

      await ticketsService.addTicketToCart({
        event: event._id,
        user: userId,
        quantity: quantityNumber,
        isPurchased: false,
      });

      console.log(`[EVENT_DETAILS] Successfully added tickets to cart, navigating to cart`);
      localStorage.removeItem("redirectedFromItem");
      navigate("/cart");
    } catch (err) {
      console.error(`[EVENT_DETAILS] Failed to add tickets to cart for event: ${event._id}`, err);
    }
  };

  return (
    <>
      <div className={classes.title}>
        <Title>{event.eventName}</Title>
        <span className={classes.date}>{formatTime(event.date)}</span>
        <span>
          {event.city}, {event.country}
        </span>
      </div>
      <div className={`${classes["event-item"]}`}>
        <div className={classes["img-container"]}>
          <img
            src={
              event.img
                ? getImageUrl(event.img)
                : "https://placehold.co/600x400/e8e8e8/e8e8e8"
            }
            alt="event"
          />
        </div>
        <div className={classes.desc}>
          <div className={classes.about}>
            <h2>About</h2>
            <p style={{ whiteSpace: "pre-wrap" }}>{event.description}</p>
          </div>
          <div className={classes.tickets}>
            <div className={classes.flex}>
              <h2>Tickets</h2>
              <h2 className={classes.price}>
                $
                {event.price !== undefined && event.price !== null
                  ? event.price.toFixed(2)
                  : ""}{" "}
                USD
              </h2>
            </div>
            <div className={classes.flex}>
              <input
                value={quantity}
                min="1"
                max="10"
                className={classes["tickets-number"]}
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
              />
              <Button className={classes.btn} onClick={handleAddToCart}>
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </div>
      <h2>Related Acts</h2>
      <div className={classes.grid}>
        {event.relatedEvents &&
          event.relatedEvents.map((e) => {
            return (
              <EventElement
                key={e._id}
                id={e._id}
                eventName={e.eventName}
                img={e.img}
                date={formatTime(e.date)}
                city={e.city}
                country={e.country}
                description={e.description}
                text="Get Ticket"
              />
            );
          })}
      </div>
    </>
  );
};

export default EventDetails;
