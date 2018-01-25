import React from 'react';

const mapDecksToOptions = (decksById) => {
  return Object.keys(decksById).map(key => (
    <option value={decksById[key].id} key={key}>{decksById[key].title}</option>
  ));
};

const FlashcardCreator = (props) => {
  let front;
  let back;
  let deckId = -1;
  let id = 1;
  console.log('DDSF', props.decksById);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.addFlashcard({ front: front.value, back: back.value, id, deckId });
          front.value = '';
          back.value = '';
          id += 1;
        }}
      >
        <input type="text" placeholder="front"
          ref={(node) => {
            front = node;
          }}
        />
        <input type="text" placeholder="back"
          ref={(node) => {
            back = node;
          }}
        />
        <select onChange={(e) => { deckId = e.target.value; }}>
          {mapDecksToOptions(props.decksById)}
        </select>
        <button type="submit">
          Add Flashcard
        </button>
      </form>
    </div>
  );
};

export default FlashcardCreator;
