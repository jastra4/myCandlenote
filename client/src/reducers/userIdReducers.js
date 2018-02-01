const userIdReducer = (state = false, action) => {
  switch (action.type) {
    case 'IS_AUTH':
      return { userId: action.userId };
    default:
      return state;
  }
};

export default userIdReducer;
