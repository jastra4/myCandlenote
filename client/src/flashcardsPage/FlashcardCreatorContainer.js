import { connect } from 'react-redux';

import { addFlashcard } from '../actions/flashcardsActions';
import FlashcardCreator from './FlashcardCreator';

const mapStateToProps = state => ({ selectedDeck: state.decks.selectedDeck });

const mapDispatchToProps = dispatch => (
  { addFlashcard: cardInfo => dispatch(addFlashcard(cardInfo)) });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlashcardCreator);
