import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading } from "../../store/slices/loadingSlice";
import classes from "../../css/TicketsHistory.module.css";
import EventElement from "../../components/EventElement.jsx";
import { formatTime } from "../../helpers/formatTime.jsx";
import PrintModal from "../../components/PopUp/PrintModal.jsx";
import NavigationLogged from "../../components/NavigationLogged.jsx";
import { decodeJwt } from "../../helpers/jwt.jsx";
import { ticketsService } from "../../services/index.js";
import Loading from "../../components/Loading/Loading.jsx";

function TicketsHistory() {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPrint, setShowPrint] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTickets, setFilteredTickets] = useState(null);

  const handlePrint = (event) => {
    setSelectedEvent(event);
  };

  const userId = decodeJwt();

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      dispatch(setIsLoading(true));
      try {
        const response = await ticketsService.fetchTicketHistory(userId, searchQuery);

        const sortedTickets = response.data
          .filter((x) => x.event)
          .sort((a, b) => {
            return new Date(b.event.date) - new Date(a.event.date);
          });

        setFilteredTickets(sortedTickets);
      } catch (err) {
        console.error("Error fetching ticket history:", err);
      } finally {
        dispatch(setIsLoading(false));
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [userId, searchQuery, dispatch]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

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
      <div className={classes.searchContainer}>
        <input
          type="text"
          placeholder="Search by event name, city, country, or description..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={classes.searchInput}
        />
      </div>
      <div className={classes.grid}>
        {isLoading || filteredTickets === null ? (
          <Loading />
        ) : filteredTickets.length === 0 ? (
          <span className={classes["no-items-found"]}>
            {searchQuery ? "No tickets match your search" : "No tickets found"}
          </span>
        ) : (
          filteredTickets.map((ticket) => {
            return (
              <EventElement
                className={
                  new Date() > new Date(ticket.event.date)
                    ? classes.disabled
                    : ""
                }
                key={ticket._id}
                id={ticket.event._id}
                eventName={ticket.event.eventName}
                date={formatTime(ticket.event.date)}
                country={ticket.event.country}
                city={ticket.event.city}
                description={ticket.event.description}
                img={ticket.event.img}
                text="Print"
                qrcode={ticket.qrCode}
                openModal={() => setShowPrint(true)}
                onPrint={() => handlePrint(ticket.event)}
              />
            );
          })
        )}
      </div>
    </>
  );
}

export default TicketsHistory;
