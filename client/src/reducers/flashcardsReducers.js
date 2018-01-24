const dotProp = require('dot-prop-immutable');

const flashcardsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_FLASHCARD':
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id] : action.payload,
        }
      };
    case 'SET_FLASHCARDS':
      const cardsById = action.payload.reduce((cards, card) => {
        cards[card.id] = card;
        return cards;
      }, {});
      return {
        byId: cardsById,
      };
    case 'SET_CURRENT_FLASHCARD':
      return {
        ...state,
        selectedFlashcard: action.payload.id,
      }
    case 'DELETE_FLASHCARD':
      return dotProp.delete(state, `byId.${action.payload.id}`);
    default:
      return state;
  }
}

export default flashcardsReducer;
