import { connect } from 'react-redux';

import FlashcardView from './FlashcardView';

const mapStateToProps = (state) => {
  const cardsById = state.flashcards.byId;
  const cardsForDeck = Object.keys(cardsById).map(key => cardsById[key])
    .filter(card => card.deckId === state.decks.currentDeck.id);
  const { currentDeck } = state.decks;

  return {
    cards: cardsForDeck,
    currentDeck,
  };
};

export default connect(mapStateToProps)(FlashcardView);
