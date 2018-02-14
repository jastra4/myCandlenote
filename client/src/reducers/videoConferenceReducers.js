const videoConferenceReducer = (state = false, action) => {
  switch (action.type) {
    case 'PASS_PEER':
      console.log('Peer in reducer: ', action.peerObject);
      return { peer: action.peerObject };
    default:
      return state;
  }
};

export default videoConferenceReducer;
