const dotProp = require('dot-prop-immutable');

// v For Testing v
const defaultState = {
  byId: {
    11: {
      id: 11,
      deckId: 7,
      front: 'Sciency Question',
      back: 'Sciency Answer',
    },
    13: {
      id: 13,
      deckId: 7,
      front: 'Another Sciency Question',
      back: 'Another Sciency Answer',
    },
    17: {
      id: 17,
      deckId: 10,
      front: 'Math Question',
      back: 'Math Answer',
    },
    20: {
      id: 20,
      deckId: 10,
      front: 'Another Math Question',
      back: 'Another Math Answer',
    },
    23: {
      id: 23,
      deckId: 10,
      front: 'Yet Another Math Question',
      back: 'Yet Another Math Answer',
    },
  },
  currentFlashcard: -1,
  allIds: [],
};

// const defaultState = {
//   byId: {},
//   currentFlashcard: -1,
//   allIds: [],
// };

const flashcardsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_FLASHCARD':
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_FLASHCARDS': {
      const cardsById = action.payload.reduce((cards, card) => ({
        ...cards,
        [card.id]: card,
      }), {});
      return { byId: cardsById };
    }
    case 'SET_CURRENT_FLASHCARD':
      return {
        ...state,
        currentFlashcard: action.payload.id,
      };
    case 'DELETE_FLASHCARD':
      return dotProp.delete(state, `byId.${action.payload.id}`);
    default:
      return state;
  }
};

export default flashcardsReducer;
