import { connect } from 'react-redux';

import FlashcardView from './FlashcardView';

const mapStateToProps = (state) => {
  const cardsById = state.flashcards.byId;
  const cardsForDeck = Object.keys(cardsById).map(key => cardsById[key])
    .filter(card => card.deckId === state.decks.currentDeck);

  return { cards: cardsForDeck };
};

export default connect(mapStateToProps)(FlashcardView);
