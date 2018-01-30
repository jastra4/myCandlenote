const dotProp = require('dot-prop-immutable');

// v For Testing v
const defaultState = {
  byId: {
    7: {
      id: '7',
      subject: 'Physics',
      title: 'Kinematics',
    },
    10: {
      id: '10',
      subject: 'Math',
      title: 'Derivatives',
    },
  },
  currentDeck: -1,
  allIds: [],
};

// const defaultState = {
//   byId: {},
//   currentDeck: -1,
//   allIds: [],
// };

const decksReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_DECK':
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_DECKS': {
      const decksById = action.payload.reduce((decks, deck) => ({
        ...decks,
        [deck.id]: deck,
      }), {});
      return { byId: decksById };
    }
    case 'SET_CURRENT_DECK': {
      const selectedDeck = { ...state.byId[action.payload.id] };
      return dotProp.set(state, 'currentDeck', selectedDeck);
    }
    case 'DELETE_DECK':
      return dotProp.delete(state, `byId.${action.payload.id}`);
    default:
      return state;
  }
};

export default decksReducer;
