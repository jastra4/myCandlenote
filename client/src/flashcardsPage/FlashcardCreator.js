import React from 'react';

const FlashcardCreator = (props) => {
  let front;
  let back;
  let id = 1;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.addFlashcard({ front: front.value, back: back.value, id });
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
        <select>
        </select>
        <button type="submit">
          Add Flashcard
        </button>
      </form>
    </div>
  );
};

export default FlashcardCreator;
