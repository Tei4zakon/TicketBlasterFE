import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading } from "../../store/slices/loadingSlice";
import classes from "../../css/Events.module.css";
import NavigationLogged from "../../components/NavigationLogged.jsx";
import Button from "../../components/Button/Button.jsx";
import ConfirmModal from "../../components/PopUp/ReusableModal.jsx";
import axios from "../../api/axios.js";
import { formatTime } from "../../helpers/formatTime.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils/imageUrl.js";

const Events = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();

  const [events, setEvents] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState("");

  useEffect(() => {
    dispatch(setIsLoading(true));
    const getAllEvents = async () => {
      try {
        const response = await axios.get("/api/events");
        setEvents(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        dispatch(setIsLoading(false));
      }
    };
    getAllEvents();
  }, [dispatch]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`/api/events/${id}`, {
        headers: { "auth-token": token },
      });
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <NavigationLogged header="Events" btn="true" />
      {showDeleteModal && (
        <ConfirmModal
          title="Are you sure?"
          message="You are about to delete an event from the system. Please proceed with caution."
          btnText="Delete event"
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={() => {
            handleDelete(selectedEventId);
            setShowDeleteModal(false);
          }}
        />
      )}
      {isLoading ? (
        <Loading />
      ) : (
        events.map((event) => {
          return (
            <div key={event._id} className={`${classes["event-item"]}`}>
              <div className={classes.flex}>
                <div className={classes["img-container"]}>
                  <img src={getImageUrl(event.img)} alt="event" />
                </div>
                <div className={classes.left}>
                  <Link to={`update-event/${event._id}`}>
                    <h2>{event.eventName}</h2>
                  </Link>
                  <div className={classes.gap}>
                    <span className={classes.date}>
                      {formatTime(event.date)}
                    </span>
                    <span className={classes.location}>
                      {event.city}, {event.country}
                    </span>
                  </div>
                </div>
              </div>
              <div className={classes.right}>
                <Button
                  className={classes.btn}
                  onClick={() => {
                    setShowDeleteModal(true);
                    setSelectedEventId(event._id);
                  }}
                >
                  Delete Event
                </Button>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default Events;
