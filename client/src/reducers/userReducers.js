const userReducer = (state = { username = '', userId = -1, oathId = '' }, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        ...action.payload,
      }
    case 'REMOVE_CURRENT_USER':
      return {
        username: '',
        userId: -1,
        oathId: '',
      }
    default:
      return state;
  }
};