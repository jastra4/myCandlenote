const { Flashcards, Decks, Messages } = require('./index');
const User = require('../server/models/user-model');

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

const insertMessage = ({ to, sentBy, text, timeStamp }) => {
  new Messages({
    to,
    sentBy,
    text,
    timeStamp,
  }).save();
};

const addFriend = (currentUser, newFriend, callback) => {
  User.findOne({ username: newFriend }, (err, friend) => {
    if (err || friend === null) {
      callback('error finding user');
    } else {
      friend.friends.push(currentUser);
      friend.save();
      User.findOne({ username: currentUser }, (error, user) => {
        user.friends.push(newFriend);
        user.save();
        callback('Added friend!');
      });
    }
  });
};

module.exports = {
  insertDeck,
  insertFlashcard,
  insertMessage,
  addFriend,
};
