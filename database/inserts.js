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

const saveMessage = ({ to, sentBy, text, timeStamp }) => {
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
      callback('No users found by that name');
    } else {
      // friend.friends.push(currentUser);
      friend.friends.addToSet({username: currentUser});
      friend.save();
      User.findOne({ username: currentUser }, (error, user) => {
        // user.friends.push(newFriend);
        user.friends.addToSet({username: newFriend});
        user.save();
        callback(newFriend);
      });
    }
  });
};

module.exports = {
  insertDeck,
  insertFlashcard,
  saveMessage,
  addFriend,
};
