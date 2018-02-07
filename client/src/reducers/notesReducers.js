const dotProp = require('dot-prop-immutable');

const defaultState = {
  byId: {},
  currentNote: -1,
  currentNoteIsSaved: true,
  allIds: [],
};

const notesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_NOTES': {
      const notesFromDB = action.payload;

      const notesById = notesFromDB.reduce((notes, note) => ({
        ...notes,
        [note._id]: note,
      }), {});

      const allIds = Object.keys(notesById);

      const currentNote = notesFromDB
        .slice()
        .sort((a, b) => (a.modifiedAt <= b.modifiedAt ? -1 : 1))[0]._id;

      return {
        ...state,
        byId: notesById,
        currentNote,
        allIds,
      };
    }
    case 'SET_CURRENT_NOTE':
      return {
        ...state,
        currentNote: action.payload.id,
      };
    case 'DELETE_NOTE':
      return dotProp.delete(state, `byId.${action.payload.id}`);

    case 'SAVING NOTE':
      return {
        ...state,
        currentNoteIsSaved: false,
      };

    case 'SAVED_NOTE':
      return {
        ...state,
        currentNoteIsSaved: true,
      };

    default:
      return state;
  }
};

export default notesReducer;
