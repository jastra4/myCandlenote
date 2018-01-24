const userReducer = (state = { username = '', userId = -1, oathId = '' }, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state;
  }
};