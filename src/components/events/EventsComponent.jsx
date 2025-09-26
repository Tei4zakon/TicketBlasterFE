import React from "react";
import EventCard from "../EventCard";

const EventsComponent = ({ events, error }) => {
  return (
    <div id="events-component">
      {error && <h1>{error}</h1>}
      {events && events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};

export default EventsComponent;