import axios from 'axios';

export const addFlashcard = cardInfo => ({
  type: 'ADD_FLASHCARD',
  payload: cardInfo,
});

export const setFlashcards = cards => ({
  type: 'SET_FLASHCARDS',
  payload: cards,
});

export const getFlashcards = deckId => (
  dispatch => (
    axios.get(`/flashCards/${deckId}`)
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
    axios.post('/deleteCard/', cardId)
      .then((res) => {
        console.log('Delte Card response:', res.data);
        dispatch({
          type: 'DELETE_FLASHCARD',
          payload: { id: cardId },
        });
      })
  )
);
