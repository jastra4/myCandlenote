import { combineReducers } from 'redux';

import decksReducer from './decksReducers';
import flashcardsReducer from './flashcardsReducers';
import notesReducer from './notesReducers';
import usersReducer from './usersReducers';
import messagesReducer from './messagesReducers';
import videosReducer from './videosReducers';

const reducers = combineReducers({
  decks: decksReducer,
  flashcards: flashcardsReducer,
  notes: notesReducer,
  user: usersReducer,
  messages: messagesReducer,
  videos: videosReducer,
});

export default reducers;
