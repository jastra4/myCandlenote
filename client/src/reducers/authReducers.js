const authReducer = (state = false, action) => {
  switch (action.type) {
    case 'IS_AUTH':
      return {
        isAuth: action.authStatus,
      };
    default:
      return state;
  }
};

export default authReducer;
