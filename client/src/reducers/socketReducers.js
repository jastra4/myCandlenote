const socketReducer = (state = false, action) => {
  switch (action.type) {
    case 'ACTIVE_SOCKET':
      return { 
      	socket: action.socket,
      	username: action.username,
      };
    default:
      return state;
  }
};

export default socketReducer;
