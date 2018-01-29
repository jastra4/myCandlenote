import { combineReducers } from 'redux';

import decksReducer from './decksReducers';
import flashcardsReducer from './flashcardsReducers';
import notesReducer from './notesReducers';
import usersReducer from './usersReducers';
import messagesReducer from './messagesReducers';
import videosReducer from './videosReducers';
import authReducer from './authReducers'; // auth stuff

const reducers = combineReducers({
  decks: decksReducer,
  flashcards: flashcardsReducer,
  notes: notesReducer,
  user: usersReducer,
  messages: messagesReducer,
  videos: videosReducer,
  isAuth: authReducer, // auth stuff
});

export default reducers;
