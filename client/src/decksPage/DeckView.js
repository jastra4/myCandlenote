import React from 'react';

const DeckCreator = (props) => {
  const { length } = { length: Object.keys(props.decksById).length };

  return (
    <div>
      <p>You have {length} decks!</p>
      <ul>
        {Object.keys(props.decksById).map((key) => {
          const deck = props.decksById[key];
          return (<li id={deck.id} key={deck.id}>Subject: {deck.subject}, Title: {deck.title}</li>);
        })}
      </ul>
    </div>
  );
};

export default DeckCreator;
