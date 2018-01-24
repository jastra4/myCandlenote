const flashcardsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FLASHCARD':
      return [
        ...state,
        action.payload,
      ];
    case 'SET_FLASHCARDS':
      return action.payload;
    case 'SET_CURRENT_FLASHCARDS':
      return 
    default:
      return state;
  }
}