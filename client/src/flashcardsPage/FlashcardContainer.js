import { connect } from 'react-redux';

import FlashcardPage from './index';
import { addFlashcard } from '../actions/flashcardsActions';

const mapStateToProps = (state) => {
  const cardsById = state.flashcards.byId;
  const cardsForDeck = Object.keys(cardsById).map(key => cardsById[key])
    .filter(card => card.deckId === state.decks.currentDeck.id);

  return {
    cards: cardsForDeck,
    currentDeck: state.decks.currentDeck,
    decksById: state.decks.byId,
  };
};

const mapDispatchToProps = dispatch => (
  { addFlashcard: cardInfo => dispatch(addFlashcard(cardInfo)) });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlashcardPage);
