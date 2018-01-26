import { connect } from 'react-redux';

import { addFlashcard } from '../actions/flashcardsActions';
import FlashcardCreator from './FlashcardCreator';

const mapStateToProps = state => ({
  currentDeck: state.decks.currentDeck,
  decksById: state.decks.byId,
});

const mapDispatchToProps = dispatch => (
  { addFlashcard: cardInfo => dispatch(addFlashcard(cardInfo)) });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlashcardCreator);
