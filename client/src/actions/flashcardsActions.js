import axios from 'axios';

export const addFlashcard = cardInfo => ({
  type: 'ADD_FLASHCARD',
  payload: cardInfo,
});

export const createFlashcard = cardInfo => (
  dispatch => (
    axios.post('/api/flashcards', cardInfo)
      .then(
        res => dispatch(addFlashcard(res.data)),
        err => console.log(err),
      )
  )
);


export const setFlashcards = cards => ({
  type: 'SET_FLASHCARDS',
  payload: cards,
});

export const getFlashcards = deckId => (
  dispatch => (
    axios.get(`/api/flashcards/${deckId}`)
      .then(
        res => dispatch(setFlashcards(res.data)),
        err => console.log(err),
      )
  )
);

export const setCurrentFlashcard = cardId => ({
  type: 'SET_CURRENT_FLASHCARD',
  payload: { id: cardId },
});

export const deleteFlashcard = cardId => (
  dispatch => (
    axios.post('/api/deleteCard/', cardId)
      .then(() => {
        dispatch({
          type: 'DELETE_FLASHCARD',
          payload: { id: cardId },
        });
      })
  )
);

export const deleteAllCardsFromDeck = deckId => ({
  type: 'DELETE_ALL_CARDS_FOR_DECK',
  payload: { id: deckId },
});
