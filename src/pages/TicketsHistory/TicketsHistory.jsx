import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading } from "../../store/slices/loadingSlice";
import classes from "../../css/TicketsHistory.module.css";
import EventElement from "../../components/EventElement.jsx";
import { formatTime } from "../../helpers/formatTime.jsx";
import PrintModal from "../../components/PopUp/PrintModal.jsx";
import NavigationLogged from "../../components/NavigationLogged.jsx";
import { decodeJwt } from "../../helpers/jwt.jsx";
import axios from "../../api/axios.js";
import Loading from "../../components/Loading/Loading.jsx";

function TicketsHistory() {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPrint, setShowPrint] = useState(false);
  const [ticketsHistory, setTicketsHistory] = useState(null);

  const handlePrint = (event) => {
    setSelectedEvent(event);
  };

  const userId = decodeJwt();

  useEffect(() => {
    dispatch(setIsLoading(true));
    const getTicketsHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/tickets/${userId}/${true}`, {
          headers: { "auth-token": token }
        });

        const sortedTickets = response.data
          .filter((x) => x.event)
          .sort((a, b) => {
            return new Date(b.event.date) - new Date(a.event.date);
          });

        setTicketsHistory(sortedTickets);
      } catch (err) {
        console
      } finally {
        dispatch(setIsLoading(false));
      }
    };
    getTicketsHistory();
  }, [userId, dispatch]);

  return (
    <>
      <NavigationLogged header="Tickets History" />
      {showPrint && (
        <PrintModal
          onClose={() => setShowPrint(false)}
          selectedEvent={selectedEvent}
          print={true}
        />
      )}
      <div className={classes.grid}>
        {isLoading || ticketsHistory === null ? (
          <Loading />
        ) : ticketsHistory.length === 0 ? (
          <span className={classes["no-items-found"]}>No tickets found</span>
        ) : (
          ticketsHistory.map((event) => {
            return (
              <EventElement
                className={
                  new Date() > new Date(event.event.date)
                    ? classes.disabled
                    : ""
                }
                key={event.event._id}
                id={event.event._id}
                eventName={event.event.eventName}
                date={formatTime(event.event.date)}
                country={event.event.country}
                city={event.event.city}
                description={event.event.description}
                img={event.event.img}
                text="Print"
                qrcode={event.qrCode}
                openModal={() => setShowPrint(true)}
                onPrint={() => handlePrint(event.event)}
              />
            );
          })
        )}
      </div>
    </>
  );
}

export default TicketsHistory;
