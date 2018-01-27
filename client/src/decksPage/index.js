import React from 'react';

import DeckCreator from './DeckCreator';
import DeckView from './DeckView';

const Deck = props => (
  <div>
    <DeckCreator
      userId={props.userId}
      addDeck={props.addDeck}
    />
    <DeckView
      decksById={props.decksById}
      setCurrentDeck={props.setCurrentDeck}
      deleteDeck={props.deleteDeck}
    />
  </div>
);

export default Deck;
