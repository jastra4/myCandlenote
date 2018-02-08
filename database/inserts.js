const { Flashcards, Decks, Messages, User, Note } = require('./index');

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

const insertNote = noteInfo => new Note(noteInfo).save();

const saveAccessToken = ({ userId, token }) => User.findOne({ _id: userId })
  .then((doc) => {
    doc.set({ googleAccessToken: token });
    return doc.save();
  });


const addFriend = (userId, friendId) => User.findOne({ _id: userId })
  .then((user) => {
    user.friends.addToSet({
      friendId,
      status: 'accepted',
    });
    return user.save();
  });

module.exports = {
  insertDeck,
  insertFlashcard,
  insertNote,
  saveAccessToken,
  saveMessage,
  addFriend,
};
