import axios from 'axios';

export const addFlashcard = (cardInfo) => ({
  type: 'ADD_FLASHCARD',
  payload: cardInfo,
});

export const setFlashcards = (cards) => ({
  type: 'SET_FLASH_CARDS',
  payload: cards
});

export const getFlashcards = (deckId) => {
  return (dispatch) => {
    return axios.get('/flashCards/' + deckId)
      .then(res => {
        dispatch(setFlashcards(res.data));
      }, err => console.log(err));
  }
}

export const setCurrentFlashcard = (cardId) => ({
  type: 'SET_CURRENT_FLASHCARD',
  payload: {id: cardId}
});

export const deleteFlashcard = (cardId) => {
  return (dispatch) => {
    return axios.post('/deleteCard', cardId)
      .then(res => {
        dispatch({
          type: 'DELETE_FLASHCARD',
          payload: {id: cardId}
        })
      });
  }
}