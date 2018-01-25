import React from 'react';

const DeckCreator = (props) => {
  let subject;
  let title;
  let id = 1;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.addDeck({
            subject: subject.value,
            title: title.value,
            userId: props.userId,
            id,
          });
          subject.value = '';
          title.value = '';
          id += 1;
        }}
      >
        <input type="text" placeholder="subject"
          ref={(node) => {
            subject = node;
          }}
        />
        <input type="text" placeholder="title"
          ref={(node) => {
            title = node;
          }}
        />
        <button type="submit">
          Add Deck
        </button>
      </form>
    </div>
  );
};

export default DeckCreator;
