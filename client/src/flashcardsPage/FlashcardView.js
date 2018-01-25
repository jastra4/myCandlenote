import React from 'react';

const FlashcardView = (props) => {
  return (
    <ul>
      {props.cards.map(card => (
        <li>Front: {card.front}, Back: {card.back}</li>
      ))}
    </ul>
  );
};

export default FlashcardView;
