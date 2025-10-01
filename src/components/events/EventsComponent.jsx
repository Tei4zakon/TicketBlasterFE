import React from "react";
import EventCard from "../EventCard";

const EventsComponent = ({ events, error }) => {
  if (error) return <h1>{error}</h1>;

  const concerts = events.filter(e => e.eventType === "musical concerts");
  const comedy = events.filter(e => e.eventType === "stand-up comedy");

  return (
    <div id="events-component">
      <h2>Musical Concerts</h2>
      <div className="musical-concerts-grid">
        {concerts.slice(0, 6).map(event => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
      {concerts.length > 6 && (
        <div id="see-all">
          <Link to="/musical-concerts">
            <button>See All Musical Concerts</button>
          </Link>
        </div>
      )}
      <h2>Stand-up Comedy</h2>
      <div className="standup-comedy-grid">
        {comedy.slice(0, 5).map(event => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
      {comedy.length > 5 && (
        <div id="see-all">
          <Link to="/stand-up-comedy">
            <button>See All Stand-up Comedy Shows</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default EventsComponent;