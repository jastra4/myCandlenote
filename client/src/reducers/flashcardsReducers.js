const dotProp = require('dot-prop-immutable');
const _ = require('lodash');

// v For Testing v
const defaultState = {
  byId: {
    11: {
      id: '11',
      deckId: '7',
      front: 'Sciency Question',
      back: 'Sciency Answer',
      urlFront: '',
      urlBack: '',
    },
    13: {
      id: '13',
      deckId: '7',
      front: 'Another Sciency Question',
      back: 'Another Sciency Answer',
      urlFront: '',
      urlBack: '',
    },
    17: {
      id: '17',
      deckId: '10',
      front: 'Math Question',
      back: 'Math Answer',
      urlFront: '',
      urlBack: '',
    },
    20: {
      id: '20',
      deckId: '10',
      front: 'Another Math Question',
      back: 'Another Math Answer',
      urlFront: '',
      urlBack: '',
    },
    23: {
      id: '23',
      deckId: '10',
      front: 'Yet Another Math Question',
      back: 'Yet Another Math Answer',
      urlFront: '',
      urlBack: '',
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
    case 'SET_FLASHCARDS': { // ***
      const cardsById = action.payload.reduce((cards, card) => ({
        ...cards,
        [card.id]: card,
      }), {});
      return {
        ...state,
        byId: cardsById,
      };
    }
    case 'SET_CURRENT_FLASHCARD':
      return {
        ...state,
        currentFlashcard: { ...state.byId[action.payload.id] },
      };
    case 'DELETE_FLASHCARD':
      return dotProp.delete(state, `byId.${action.payload.id}`);
    case 'DELETE_ALL_CARDS_FOR_DECK': {
      const filteredCards = _.filter(state.byId, entry => entry.deckId !== action.payload.id);
      const newState = {
        currentFlashcard: { ...state.currentFlashcard },
        byId: {},
      };
      filteredCards.forEach((card) => { newState.byId[card.id] = card; });
      return newState;
    }
    default:
      return state;
  }
};

export default flashcardsReducer;
