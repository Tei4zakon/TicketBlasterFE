
import {
    GET_EVENTS_REQUEST,
    GET_EVENTS_SUCCESS,
    GET_EVENTS_FAIL,
  } from "./constants";
  
  const initialState = {
    events: [],
    error: undefined,
  };
  
  export default function reducer(state = initialState, action) {
    switch (action.type) {
      case GET_EVENTS_REQUEST:
        return {
          ...state,
        };
      case GET_EVENTS_SUCCESS:
        return {
          ...state,
          events: action.payload,
        };
      case GET_EVENTS_FAIL:
        return {
          ...state,
          error: action.payload,
        };
  
      default:
        return state;
    }
  }
  