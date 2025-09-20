import React,{useEffect, useState} from 'react';
import { Link } from 'react-router';

import EventCard from './EventCard';

const Homepage = () => {
    
    const [event, setEvent] = useState([]);
    useEffect(() => {
        fetch("http://localhost:2741/")
        .then((res) => res.json())
        .then((data) => setEvent(data));
    }, []);

    const concerts = event.filter((e) => e.eventType === "musical concerts");
    const comedy = event.filter((e) => e.eventType === "stand-up comedy");

    return(
        <div className='homepage-container'>
            <h2>Musical Concerts</h2>
            <div className='musical-concerts-grid'>
                {concerts.slice(0,5).map((event) => (
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
    )
}

export default Homepage 