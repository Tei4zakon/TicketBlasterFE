
import {
    GET_EVENTS_REQUEST,
    GET_EVENTS_SUCCESS,
    GET_EVENTS_FAIL,
  } from "./constants";
  
  export const fetchEventsRequest = (requestParams) => {
    return {
      type: GET_EVENTS_REQUEST,
      payload: requestParams,
    };
  };
  
  export const fetchEventsSuccess = (events) => {
      console.log(events)
    return {
      type: GET_EVENTS_SUCCESS,
      payload: events,
    };
  };
  
  export const fetchEventsFail = (err) => {
    return {
      type: GET_EVENTS_FAIL,
      payload: err,
    };
  };
  