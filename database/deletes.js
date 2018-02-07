const { Flashcards, Decks, Groups } = require('./index');
const User = require('../server/models/user-model');

const deleteFlashcard = id => Flashcards.remove({ _id: id });

const deleteDeck = id => Decks.remove({ _id: id })
  .then(() => Flashcards.remove({ deckId: id }));

const closePrivateChat = (username, otheruser, callback) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      console.log(err);
      callback(false);
    } else {
      console.log('pulled ', otheruser, ' from ', username);
      console.log('privateChats: ', user.privateChats);
      user.privateChats.pull({ username: otheruser });
      user.save();
      callback(true);
    }
  });
};

const removeGroupMember = (groupname, username, callback) => {
  Groups.findOne({ groupname }, (err, group) => {
    if (err) {
      console.log(err);
      callback(false);
    } else {
      group.members.pull({ member: username });
      group.save();
    }
  });
  User.findOne({ username }, (err, user) => {
    if (err) {
      callback(false);
    } else {
      user.groupChats.pull({ groupname });
      user.save();
      callback(true);
    }
  });
};

const deleteUser = (username) => {
  User.findOne({ username }, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      docs.remove();
      console.log('removed :', docs);
    }
  });
};

module.exports = {
  deleteDeck,
  deleteFlashcard,
  closePrivateChat,
  removeGroupMember,
  deleteUser,
};
