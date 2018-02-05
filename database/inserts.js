const { Flashcards, Decks, Messages, Groups } = require('./index');
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
  User.findOne({ username: to }, (err, user) => {
    if (err || user === null) {
      console.log('No users found by that name');
    } else {
      user.privateChats.addToSet({ username: sentBy });
      user.save();
    }
  });
  new Messages({
    to,
    sentBy,
    text,
    timeStamp,
  }).save();
};

const addFriend = (currentUser, newChatPartner, callback) => {
  // add user to friends list (private chat) after searching their name
  User.findOne({ username: currentUser }, (error, user) => {
    user.privateChats.addToSet({ username: newChatPartner });
    user.save();
    callback(newChatPartner);
  });
};

const addGroupMember = (groupname, username, callback) => {
  Groups.findOne({ groupname }, (err, group) => {
    if (err) {
      console.log(err);
      callback(false);
    } else {
      group.members.addToSet({ username });
      group.save();
      callback(true);
    }
  });
};

const createGroup = (groupname, username) => {
  console.log('create group: ', groupname);
  console.log('add user: ', username);
  new Groups({
    groupname,
    members: [{ username }],
  }).save();
};

module.exports = {
  insertDeck,
  insertFlashcard,
  saveMessage,
  addFriend,
  addGroupMember,
  createGroup,
};
