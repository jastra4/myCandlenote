import axios from 'axios';

export const addDeck = deckInfo => ({
  type: 'ADD_DECK',
  payload: deckInfo,
});

export const createDeck = deckInfo => (
  dispatch => (
    axios.post('/api/decks', deckInfo)
      .then(
        res => dispatch(addDeck(res.data)),
        err => console.log(err),
      )
  )
);

export const setDecks = decks => ({
  type: 'SET_DECKS',
  payload: decks,
});

export const getDecks = deckId => (
  dispatch => (
    axios.get(`/api/decks/${deckId}`)
      .then(
        res => dispatch(setDecks(res.data)),
        err => console.log(err),
      )
  )
);

export const setCurrentDeck = deckId => ({
  type: 'SET_CURRENT_DECK',
  payload: { id: deckId },
});

export const deleteDeck = deckId => (
  dispatch => (
    axios.post('/api/deleteDeck/', deckId)
      .then((res) => {
        console.log('Delete deck response:', res.data);
        dispatch({
          type: 'DELETE_DECK',
          payload: { id: deckId },
        });
      })
  )
);
