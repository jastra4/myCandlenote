const dotProp = require('dot-prop-immutable');

const defaultState = {
  byId: {},
  currentDeck: -1,
  allIds: [],
};

const decksReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_DECK':
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: action.paylaod,
        },
      };
    case 'SET_DECKS': {
      const decksById = action.payload.reduce((decks, deck) => ({
        ...decks,
        [deck.id]: deck,
      }), {});
      return { byId: decksById };
    }
    case 'SET_CURRENT_DECK':
      return {
        ...state,
        currentDeck: action.payload.id,
      };
    case 'DELETE_DECK':
      return dotProp.delete(state, `byId.${action.payload.id}`);
    default:
      return state;
  }
};

export default decksReducer;
