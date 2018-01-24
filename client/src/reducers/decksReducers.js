const dotProp = require('dot-prop-immutable');

const decksReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_DECK':
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: action.paylaod,
        }
      }
    case 'SET_DECKS':
      const decksById = action.payload.reduce((decks, deck) => {
        decks[deck.id] = deck;
        return decks;
      }, {});
      return {
        byId: decksById,
      }
    case 'SET_CURRENT_DECK':
      return {
        ...state,
        selectedDeck: action.payload.id,
      }
    case 'DELETE_DECK':
      return dotProp.delete(state, `byId.${action.payload.id}`);
    default:
      return state;
  }
};

export default decksReducer;