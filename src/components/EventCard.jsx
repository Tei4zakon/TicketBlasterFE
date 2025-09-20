import React from "react";

const EventCard = () => {

    return(
        <div className="event-card">
            <img  className="event-image" src={`http://localhost:2741${image}`} alt={artistName}></img>
            <div id="event-description">
            <h2>{artistName}</h2>
            <p>{eventDate}</p>
            <p>{description}</p>
            <p>{location.city},{location.country}</p>
            <button id="get-tickets-btn">Get tickets</button>
            </div>
        
        </div>
    )
}

export default EventCard