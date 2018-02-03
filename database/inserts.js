const { Flashcards, Decks, Messages } = require('./index');

const insertFlashcard = ({ front, back, deckId, userId }) => (
  new Flashcards({
    front,
    back,
    deckId,
    userId,
  }).save()
);

const insertDeck = ({ subject, title, userId }) => (
  new Decks({
    subject,
    title,
    userId,
  }).save()
);

const insertMessage = ({ to, sentBy, text, timeStamp }) => {
  console.log('insertMessage invoked');
  new Messages({
    to,
    sentBy,
    text,
    timeStamp,
  }).save();
};

module.exports = {
  insertDeck,
  insertFlashcard,
  insertMessage,
};
