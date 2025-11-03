import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../../css/EventCreation.module.css";
import NavigationLogged from "../../components/NavigationLogged.jsx";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import Dropdown from "../../components/Dropdown/Dropdown.jsx";
import ErrorModal from "../../components/PopUp/ReusableModal.jsx";
import axiosJSON from "../../api/axios.js";
import { formatTime } from "../../helpers/formatTime.jsx";
import { getImageUrl } from "../../utils/imageUrl.js";

const EventCreation = () => {
  const [eventName, setEventName] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const [eventPhoto, setEventPhoto] = useState("");
  const [eventPhotoURL, setEventPhotoURL] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [category, setCategory] = useState("Concert");
  const [date, setDate] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [relatedEventsOptions, setRelatedEventsOptions] = useState([]);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [selectedRelatedEventId, setSelectedRelatedEventId] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRelatedEvents = async () => {
      try {
        const response = await axiosJSON.get(
          `/api/events/type?type=${category}`
        );
        setRelatedEventsOptions(response.data);
        const initialEvents = response.data.slice(0, 2).filter(Boolean);
        setRelatedEvents(initialEvents);
        if (response.data[0]) {
          setSelectedRelatedEventId(response.data[0]._id);
        }
      } catch (error) {
        console.error("[CREATE_EVENT] Failed to fetch related events", error);
      }
    };
    fetchRelatedEvents();
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const priceValue = parseFloat(ticketPrice);

    const token = localStorage.getItem("token");
    try {
      await axiosJSON.post(
        "/api/events",
        {
          img: eventPhotoURL,
          eventName: eventName,
          date,
          description: eventDetails,
          city: selectedCity,
          country: selectedCountry,
          eventType: category,
          price: priceValue,
          relatedEvents,
        },
        { headers: { "auth-token": token } }
      );
      navigate("/events");
    } catch (error) {
      setShowModal(true);
    }
  };

  const handleAddRelatedEvent = (e) => {
    e.preventDefault();
    if (selectedRelatedEventId) {
      const selectedEvent = relatedEventsOptions.find(
        (event) => event._id === selectedRelatedEventId
      );

      const isEventAlreadyAdded = relatedEvents.some(
        (event) => event._id === selectedEvent._id
      );

      const isMaximumEventsReached = relatedEvents.length >= 2;

      if (!isEventAlreadyAdded && !isMaximumEventsReached) {
        setRelatedEvents((prevRelatedEvents) => [
          ...prevRelatedEvents,
          selectedEvent,
        ]);
      }
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const previewURL = URL.createObjectURL(file);
    setEventPhoto(previewURL);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axiosJSON.post("/api/upload-event-img", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setEventPhotoURL(response.data.imageUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      {showModal && (
        <ErrorModal
          title="Unable to Create Event"
          message="Please ensure all required fields are filled out correctly (event name, details, date, location, and price) and try again."
          btnText="OK"
          onConfirm={() => setShowModal(false)}
          hideBtn={true}
        ></ErrorModal>
      )}
      <NavigationLogged header="Events" />
      <div className={classes.flex}>
        <div className={classes["flex-column"]}>
          <Input
            label="Event Name"
            type="text"
            value={eventName}
            onChange={(e) => {
              setEventName(e.target.value);
            }}
          />
          <div className={classes["upload-wrapper"]}>
            <label htmlFor="upload" className={classes["upload-button"]}>
              Upload Event Art
            </label>
            <input
              type="file"
              id="upload"
              name="upload"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div className={classes["img-container"]}>
            {eventPhoto ? (
              <img src={getImageUrl(eventPhoto)} alt="" />
            ) : (
              <span className={classes["alt-text"]}>Event Photo</span>
            )}
          </div>
        </div>
        <div className={classes["flex-column"]}>
          <div className={classes.flex}>
            <Dropdown
              label="Category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="Concert">Musical Concert</option>
              <option value="Comedy">Stand-Up Comedy</option>
            </Dropdown>
            <Input
              label="Date"
              type="date"
              className={classes["date-input"]}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <Input
            isTextArea={true}
            className={classes["event-details"]}
            label="Event Details"
            value={eventDetails}
            onChange={(e) => setEventDetails(e.target.value)}
          />
          <div className={classes.flex}>
            <div className={classes["flex-column"]}>
              <Input
                label="City"
                type="text"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              />
              <Input
                label="Ticket Price"
                type="number"
                value={ticketPrice}
                onChange={(e) => {
                  setTicketPrice(e.target.value);
                }}
              />
            </div>
            <Input
              label="Country"
              type="text"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className={classes.container}>
        <Dropdown
          label="Related Events:"
          value={selectedRelatedEventId}
          onChange={(e) => setSelectedRelatedEventId(e.target.value)}
        >
          {relatedEventsOptions.map((event) => {
            return (
              <option key={event._id} value={event._id}>
                {event.eventName} - {formatTime(event.date)} - {event.city},{" "}
                {event.country}
              </option>
            );
          })}
        </Dropdown>
        <Button
          onClick={handleAddRelatedEvent}
          className={`${classes.btn} ${classes["bigger-btn"]}`}
        >
          Add
        </Button>
      </div>
      <div className={classes.flex}>
        {relatedEvents.filter(Boolean).map((relatedEvent) => {
          return (
            <div key={relatedEvent._id} className={classes["related-event"]}>
              <div className={classes.left}>
                <div className={classes.img}>
                  <img alt="" src={getImageUrl(relatedEvent.img)} />
                </div>
              </div>
              <div className={classes.right}>
                <div className={classes["event-info"]}>
                  <h2>{relatedEvent.eventName}</h2>
                  <span className={classes.date}>
                    {formatTime(relatedEvent.date)}
                  </span>
                  <span className={classes.location}>
                    {relatedEvent.city}, {relatedEvent.country}
                  </span>
                </div>
                <Button
                  onClick={() => {
                    setRelatedEvents(
                      relatedEvents.filter((e) => e._id !== relatedEvent._id)
                    );
                  }}
                  className={classes["remove-btn"]}
                >
                  Remove
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <div className={classes["btn-container"]}>
        <Button
          type="submit"
          className={`${classes.btn} ${classes["bigger-btn"]} ${classes["save-btn"]}`}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default EventCreation;
