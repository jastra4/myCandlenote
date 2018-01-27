const { Flashcards, Decks } = require('./index');

const deleteFlashcard = id => Flashcards.remove({ _id: id });

const deleteDeck = id => Decks.remove({ _id: id })
  .then(() => Flashcards.remove({ deckId: id }));

module.exports = {
  deleteDeck,
  deleteFlashcard,
};
