const { Flashcards, Decks, Messages, Notes } = require('./index');
const User = require('../server/models/user-model');

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

const saveMessage = ({ to, sentBy, text, timeStamp }) => {
  // add user to friends list (private chat) after receiving a message from them
  User.findOne({ username: to }, (err, friend) => {
    if (err || friend === null) {
      console.log('No users found by that name');
    } else {
      friend.friends.addToSet({ username: sentBy });
      friend.save();
    }
  });
  new Messages({
    to,
    sentBy,
    text,
    timeStamp,
  }).save();
};

const insertNote = noteInfo => new Notes(noteInfo).save();

const addFriend = (currentUser, newFriend, callback) => {
  // add user to friends list (private chat) after searching their name
  User.findOne({ username: currentUser }, (error, user) => {
    user.friends.addToSet({ username: newFriend });
    user.save();
    callback(newFriend);
  });
};

module.exports = {
  insertDeck,
  insertFlashcard,
  insertNote,
  saveMessage,
  addFriend,
};
