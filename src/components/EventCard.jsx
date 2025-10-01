import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
    const { _id, artistName, eventDate, description, location, image } = event;

    return(
        <div className="event-card">
            <img  className="event-image" src={`http://localhost:2741${image}`} alt={artistName}></img>
            <div id="event-description">
            <h2>{artistName}</h2>
            <p>{new Date(eventDate).toLocaleDateString()}</p>
            <p>{description}</p>
            <p>{location?.city},{location?.country}</p>
            <button id="get-tickets-btn"><Link to={`/ticket/${_id}`}>Get tickets</Link></button>
            </div>
        
        </div>
    )
}

export default EventCard;