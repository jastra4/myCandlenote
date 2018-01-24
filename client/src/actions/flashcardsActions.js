import axios from 'axios';

export const addFlashcard = (cardInfo) => ({
  type: 'ADD_FLASHCARD',
  payload: cardInfo,
});

export const setFlashcards = (cards) => ({
  
});