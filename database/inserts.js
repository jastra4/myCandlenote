const { Flashcards, Decks } = require('./index');

const insertFlashcard = ({ front, back, deckId }) => (
  new Flashcards({
    front,
    back,
    deckId,
  }).save()
);

const insertDeck = ({ subject, title, userId }) => (
  new Decks({
    subject,
    title,
    userId,
  }).save()
);

module.exports = {
  insertDeck,
  insertFlashcard,
};
