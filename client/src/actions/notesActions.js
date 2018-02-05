import axios from 'axios';

export const addNote = noteInfo => ({
  type: 'ADD_NOTE',
  payload: noteInfo,
});

export const createNote = (noteInfo) => {
  console.log('new noteInfo for dispatch: ', noteInfo);
  return (
    dispatch => (
      axios.post('/api/createNote', { noteInfo })
        .then((res) => {
          // dispatch(addNote(res.data)); 
          console.log('res from note creation: ', res);
        })
        .catch((err) => { console.error(err); })
    )
)};

export const editNote = (noteInfo) => {
  console.log('update noteInfo for dispatch: ', noteInfo);
  return (
    dispatch => (
      axios.post('/api/editNote', { noteInfo })
        .then((res) => {
          // dispatch(addNote(res.data)); 
          console.log(res);
        })
        .catch((err) => { console.error(err); })
    )
  )
};



export const setNotes = notes => ({
  type: 'SET_NOTES',
  payload: notes,
});

export const getNotes = userId => (
  dispatch => (
    axios.get(`/api/notes/${userId}`)
      .then((res) => {
        console.log('Getting note:', res.data);
        dispatch(setNotes(res.data));
      }, err => console.log(err))
  )
);

export const setCurrentNote = noteId => ({
  type: 'SET_CURRENT_NOTES',
  payload: { id: noteId },
});

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
