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
  console.log('addGroupMember: ', username);
  console.log('to group: ', groupname);
  Groups.findOne({ groupname }, (err, group) => {
    if (err) {
      console.log('group does not exist!');
      callback(false);
    } else {
      group.members.addToSet({ username });
      group.save();
      console.log('added ', username, ' to ', group);
    }
  });
  User.findOne({ username }, (err, user) => {
    if (err) {
      console.log(err);
      callback(false);
    } else {
      user.groupChats.addToSet({ groupname });
      user.save();
      callback(true);
      console.log('added ', groupname, ' to ', user);
    }
  });
};

const createGroup = (groupname, username, callback) => {
  // make sure group does not exist
  Groups.findOne({ groupname }, (err) => {
    if (err) {
      // make new group
      new Groups({
        groupname,
        members: [{ username }],
      }).save();
      // add user to group
      addGroupMember(groupname, username, callback);
    } else {
      console.log('group already exists');
      callback(false);
    }
  });
};

module.exports = {
  insertDeck,
  insertFlashcard,
  saveMessage,
  addFriend,
  addGroupMember,
  createGroup,
};
