import { connect } from 'react-redux';
import NotesPage from './index';
import { createNote, editNote, deleteNote } from '../actions/notesActions';
import { setCurrentMeaning, setMaxResults } from '../actions/intellisearchActions';


const mapStateToProps = (state) => {
  console.log('state: ', state);
  const cardsById = state.flashcards.byId;
  const cardsForDeck = Object.keys(cardsById).map(key => cardsById[key])
    .filter(card => card.deckId === state.decks.currentDeck.id);

  return {
    cards: cardsForDeck,
    currentDeck: state.decks.currentDeck,
    decksById: state.decks.byId,
    meaning: state.intelliSearch.meaning,
    limit: state.intelliSearch.limit,
    currentNote: state.notes.currentNote,
    notes: state.notes.byId,
  };
};

const mapDispatchToProps = dispatch => ({
  createNote: noteInfo => dispatch(createNote(noteInfo)),
  editNote: noteInfo => dispatch(editNote(noteInfo)),
  setCurrentMeaning: meaning => dispatch(setCurrentMeaning(meaning)),
  setMaxResults: limit => dispatch(setMaxResults(limit)),
  deleteNote: noteId => dispatch(deleteNote(noteId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotesPage);
