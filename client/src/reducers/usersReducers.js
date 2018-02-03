const defaultState = {
  byId: {},
  currentUser: {
    username: '',
    userId: '',
    googleId: '',
    profileImage: '',
  },
};

const usersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      console.log('ACTION:', action);
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...action.payload,
        },
      };
    case 'REMOVE_CURRENT_USER':
      return {
        ...state,
        currentUser: {
          username: '',
          userId: '',
          googleId: '',
          profileImage: '',
        },
      };
    case 'SET_USERS': {
      const usersById = action.payload.reduce((users, user) => ({
        ...users,
        [user._id]: user,
      }), {});
      return {
        ...state,
        byId: usersById,
      };
    }
    default:
      return state;
  }
};

export default usersReducer;
