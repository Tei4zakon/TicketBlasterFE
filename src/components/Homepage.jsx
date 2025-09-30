import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import EventCard from './EventCard';
import { Events } from './events';

const Homepage = () => {
    
    const [event, setEvent] = useState([]);
    useEffect(() => {
        axios
      .get("http://localhost:2741/") 
      .then((res) => {
        setEvent(res.data);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
      });
  }, []);

    const concerts = event.filter((e) => e.eventType === "musical concerts");
    const comedy = event.filter((e) => e.eventType === "stand-up comedy");

    return(
        <div className='homepage-container'>
            <div id='front-event'>
                {concerts.slice(0, 1).map((event) => (
                <EventCard key={event._id} {...event} />
            ))}
            </div>
            <div>
            <h2>Musical Concerts</h2>
            <div className='musical-concerts-grid'>
                {concerts.slice(1,6).map((event) => (
                    <EventCard key={event._id}
                    {...event} />
                ))}
            </div>
            {concerts.length > 5 && (
                <div id='see-all'>
                    <Link to='/musical-concerts'>
                    <button>See All Musical Concerts</button>
                    </Link>
                </div>
             )}
            
            <h2>Stand-up Comedy</h2>
            <div className='standup-comedy-grid'>
                {comedy.slice(0,5).map((event) => (
                    <EventCard key={event._id}
                    {...event} />
                ))}
            </div>
            {comedy.length > 5 && (
                <div id='see-all'>
                    <Link to='/stand-up-comedy'>
                        <button> See All Stand-up Comedy Shows</button>
                    </Link>
                    </div>
            )}
            </div>
                
        </div>
    )
}

export default Homepage 