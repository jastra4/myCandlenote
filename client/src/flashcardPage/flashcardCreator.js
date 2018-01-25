import React from 'react';
import { connect } from 'react-redux';
import { addFlashcard } from '../actions/flashcardsActions';

const FlashcardCreator = ({ dispatch }) => {
  let front;
  let back;
  let id = 1;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!front.value.trim()) {
            return;
          }
          dispatch(addFlashcard({ front: front.value, back: back.value, id }));
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
        <button type="submit">
          Add Flashcard
        </button>
      </form>
    </div>
  );
};

export default connect()(FlashcardCreator);
