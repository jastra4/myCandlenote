import { connect } from 'react-redux';
import NoteBox from './index';
import { getNotes, setCurrentNote } from '../actions/notesActions';

const mapStateToProps = (state) => {
  const notesArray = Object.keys(state.notes.byId)
    .map(id => state.notes.byId[id]);

  return {
    notes: notesArray,
    currentNote: state.notes.currentNote,
  };
};

const mapDispatchToProps = dispatch => ({
  setCurrentNote: noteId => dispatch(setCurrentNote(noteId)),
  getNotes: userId => dispatch(getNotes(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NoteBox);
