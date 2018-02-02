const { Flashcards, Decks, Messages } = require('./index');
const User = require('../server/models/user-model');
const db = require('./index');

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
  User.findOne({ username: currentUser }, (err, user) => {
    if (err) {
      callback('error finding user');
    }
    user.friends.push(newFriend);
    user.save((error) => {
      if (error) {
        callback('error saving');
      } else {
        // callback('Added friend!');
      }
    });
  });
  User.findOne({ username: newFriend }, (err, user) => {
    if (err) {
      callback('error finding user');
    }
    user.friends.push(currentUser);
    user.save((error) => {
      if (error) {
        callback('error saving');
      } else {
        callback('Added friend!');
      }
    });
  });

};

module.exports = {
  insertDeck,
  insertFlashcard,
  insertMessage,
  addFriend,
};
