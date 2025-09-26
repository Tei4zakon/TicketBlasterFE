
import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
//import { usersReducer } from './components/auth';
// import { authReducer } from './components/auth/duck';
import {eventsReducer} from './components/events/duck';

const reducer = {
    // usersReducer:usersReducer,
    // authReducer:authReducer,
    eventsReducer:eventsReducer
}

export default configureStore({
    reducer:reducer,
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(logger)
})
