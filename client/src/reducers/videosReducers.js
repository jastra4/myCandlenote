const dotProp = require('dot-prop-immutable');

const defaultState = {
  byId: {},
  currentVideo: -1,
  allIds: [],
};

const videosReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_VIDEO':
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_VIDEOS': {
      const videosById = action.payload.reduce((videos, video) => ({
        ...videos,
        [video.id]: video,
      }), {});
      return {
        ...state,
        byId: videosById,
      };
    }
    case 'SET_CURRENT_VIDEO':
      return {
        ...state,
        currentvideo: { ...state.byId[action.payload.id] },
      };
    case 'DELETE_VIDEO':
      return dotProp.delete(state, `byId.${action.payload.id}`);
    default:
      return state;
  }
};

export default videosReducer;
