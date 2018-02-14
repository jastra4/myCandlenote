const { Flashcards, Decks, Note, User, Groups } = require('./index');

const deleteFlashcard = id => Flashcards.remove({ _id: id });

const deleteDeck = id => Decks.remove({ _id: id })
  .then(() => Flashcards.remove({ deckId: id }));

const closePrivateChat = (username, otheruser, callback) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      console.log(err);
      callback(false);
    } else {
      user.privateChats.pull({ username: otheruser });
      user.save();
      callback(true);
    }
  });
};

const deleteNote = noteId => (
  Note.remove({ _id: noteId })
    .then(() => { console.log('Successfully deleted note: ', noteId); })
    .catch((e) => { console.error(e); })
);

const removeGroupMember = (username, groupname, callback) => {
  Groups.findOne({ groupname }, (err, group) => {
    if (err) {
      console.log(err);
      callback(false);
    } else {
      group.members.pull(username); //
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
  console.log('deleteUser ', username);
  User.findOne({ username }, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      docs.remove();
      console.log('removed :', docs);
    }
  });
};

const removeFriendById = (userId, friendId) => User.findOne({ _id: userId })
  .then((user) => {
    user.friends.pull({ friendId });
    return user.save();
  });

module.exports = {
  deleteDeck,
  deleteFlashcard,
  deleteNote,
  removeFriendById,
  closePrivateChat,
  removeGroupMember,
  deleteUser,
};
