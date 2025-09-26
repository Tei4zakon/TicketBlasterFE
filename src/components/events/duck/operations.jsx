import {
    fetchEventsRequest,
    fetchEventsSuccess,
    fetchEventsFail,
  } from "./actions";
  import { getEvents } from "./../../../api/eventsApi";
  
  export const fetchEvents = (requestParams) => {
      console.log("REQUESTPARAMS",requestParams)
    return (dispatch) => {
      dispatch(fetchEventsRequest(requestParams));
      return getEvents(requestParams)
        .then((res) => {
          console.log(res)
          dispatch(fetchEventsSuccess(res));
          return res;
        })
        .catch((err) => {
          dispatch(fetchEventsFail(err.message));
          return err.message;
        });
    };
  };