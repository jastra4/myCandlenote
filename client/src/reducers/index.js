import { combineReducers } from 'redux';

import decksReducer from './decksReducers';
import flashcardsReducer from './flashcardsReducers';
import notesReducer from './notesReducers';
import usersReducer from './usersReducers';

const reducers = combineReducers({
  decks: decksReducer,
  flashcards: flashcardsReducer,
  notes: notesReducer,
  user: usersReducers,
});

export default reducers;