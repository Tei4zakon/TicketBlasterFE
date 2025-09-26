import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';

import EventsComponent from './EventsComponent';
import {fetchEvents} from './duck/operations';

const EventsContainer = () => {

    const dispatch = useDispatch();
    const events = useSelector(state=>state.eventsReducer.events);
    const error = useSelector(state=>state.eventsReducer.error);


    useEffect(()=>{
        dispatch(fetchEvents())
    },[dispatch])

    return(
        <div id='events-container'>
            <EventsComponent events={events} error={error}/>
        </div>
    )
};

export default EventsContainer