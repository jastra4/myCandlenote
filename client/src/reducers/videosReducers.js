const dotProp = require('dot-prop-immutable');

const videosReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_VIDEO':
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload,
        }
      };
    case 'SET_VIDEOS':
      const videosById = action.payload.reduce((videos, video) => {
        videos[video.id] = video;
        return videos;
      }, {});
      return {
        byId: videosById,
      };
    case 'SET_CURRENT_VIDEO':
      return {
        ...state,
        selectedvideo: action.payload.id,
      }
    case 'DELETE_VIDEO':
      return dotProp.delete(state, `byId.${action.payload.id}`);
    default:
      return state;
  }
}

export default videosReducer;