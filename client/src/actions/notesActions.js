import axios from 'axios';

export const addNote = noteInfo => ({
  type: 'ADD_NOTE',
  payload: noteInfo,
});

export const savedNote = () => ({ type: 'SAVED_NOTE' });

export const savingNote = () => ({ type: 'SAVING_NOTE' });

export const editNote = (noteInfo) => {
  console.log('update noteInfo for dispatch: ', noteInfo);
  return (
    (dispatch) => {
      dispatch(savingNote());
      return (
        axios.post('/api/editNote', { noteInfo })
          .then(() => {
            console.log('successfully updated note');
            dispatch(savedNote());
          })
          .catch((err) => {
            console.error(err);
          })
      );
    }
  );
};

export const setNotes = notes => ({
  type: 'SET_NOTES',
  payload: notes,
});

export const getNotes = userId => (
  dispatch => (
    axios.get(`/api/getNotes/${userId}`)
      .then((res) => {
        console.log('Getting note:', res.data);
        dispatch(setNotes(res.data));
      })
      .catch((e) => { console.error(e); })
  )
);

export const setCurrentNote = noteId => ({
  type: 'SET_CURRENT_NOTE',
  payload: { id: noteId },
});

export const clearCurrentNote = () => ({ type: 'CLEAR_CURRENT_NOTE' });


export const resetClearCurrentNote = () => ({ type: 'RESET_CLEAR_CURRENT_NOTE' });

export const createNote = noteInfo => (
  dispatch => (
    axios.post('/api/createNote', { noteInfo })
      .then(({ data: { noteId, authorID } }) => {
        console.log('dispatching new note: ', noteId);
        dispatch(setCurrentNote(noteId));
        dispatch(clearCurrentNote());
        dispatch(getNotes(authorID));
      })
      .catch((err) => { console.error(err); })
  )
);

export const deleteNote = noteId => (
  dispatch => (
    axios.post('/api/deleteNote/', noteId)
      .then((res) => {
        console.log('Delete note res:', res.body);
        dispatch({
          type: 'DELETE_NOTE',
          payload: { id: noteId },
        });
      })
  )
);
