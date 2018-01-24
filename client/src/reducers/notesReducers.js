const notesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return [
        ...state,
        action.payload,
      ];
    case 'SET_NOTES':
      return action.payload;
    case 'SET_CURRENT_NOTE':
      return state.find(note => note.id === action.payload.id);
    default:
      return state;
  }
};