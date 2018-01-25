import React from 'react';
import { withRouter } from 'react-router-dom';

const DeckCreator = (props) => {
  const { length } = { length: Object.keys(props.decksById).length };

  return (
    <div>
      <p>You have {length} decks!</p>
      <ul>
        {Object.keys(props.decksById).map((key) => {
          const deck = props.decksById[key];
          return (<li
            id={deck.id}
            key={deck.id}
            onClick={() => {
              props.setCurrentDeck(deck.id);
              props.history.push('/flashcards');
            }}
          >
            Subject: {deck.subject}, Title: {deck.title}
          </li>);
        })}
      </ul>
    </div>
  );
};

export default withRouter(DeckCreator);
