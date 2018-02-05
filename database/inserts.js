const { Flashcards, Decks, Messages, User } = require('./index');

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

const saveAccessToken = ({ userId, token }) =>
  User.findOne({ _id: userId })
    .then((doc) => {
      doc.set({ googleAccessToken: token });
      return doc.save();
    });

module.exports = {
  insertDeck,
  insertFlashcard,
  insertMessage,
  saveAccessToken,
};
