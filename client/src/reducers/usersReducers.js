const defaultState = {
  username: '',
  userId: -1,
  oathId: '',
};

const usersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        ...action.payload,
      };
    case 'REMOVE_CURRENT_USER':
      return {
        username: '',
        userId: -1,
        oathId: '',
      };
    default:
      return state;
  }
};

export default usersReducer;
