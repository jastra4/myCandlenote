const defaultState = {
  byId: {},
  currentUser: {
    username: '',
    userId: '',
    googleId: '',
    profileImage: '',
    friends: [],
  },
};

const usersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...action.payload,
          friends: [],
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
          friends: [],
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
    case 'SET_CURRENT_FRIENDS':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          friends: action.payload,
        },
      };
    case 'ADD_FRIEND':
      if (state.currentUser.friends.find(friend => friend.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          friends: [...state.currentUser.friends, action.payload],
        },
      };
    case 'REMOVE_FRIEND':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          friends: state.currentUser.friends.filter(friend => friend.id !== action.payload),
        },
      };
    default:
      return state;
  }
};

export default usersReducer;
