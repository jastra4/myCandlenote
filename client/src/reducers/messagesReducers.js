const dotProp = require('dot-prop-immutable');

const defaultState = {
  byId: {},
  currentMessage: -1,
  allIds: [],
};

const messagesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_MESSAGES': {
      console.log('SET_MESSAGES: ', action.payload);
      const messagesById = action.payload.reduce((messages, message) => ({
        ...messages,
        [message._id]: message,
      }), {});
      return { byId: messagesById };
    }
    case 'SET_CURRENT_MESSAGE':
      return {
        ...state,
        currentMessage: { ...state.byId[action.payload.id] },
      };
    case 'DELETE_MESSAGE':
      return dotProp.delete(state, `byId.${action.payload.id}`);
    default:
      return state;
  }
};

export default messagesReducer;
