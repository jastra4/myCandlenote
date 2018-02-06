const User = require('../server/models/user-model');

const { Decks, Flashcards, Note } = require('./index');
const db = require('./index');

const getUserName = (id, callback) => {
  User.findOne({ _id: id }, (err, person) => {
    if (err) {
      callback(err);
    } else {
      callback(person.username);
    }
  });
};

const loadChatHistory = (sentBy, to, callback) => {
  const query = db.Messages.find({ $or: [{ $and: [{ sentBy: { $in: [sentBy] } }, { to: { $in: [to] } }] }, { $and: [{ sentBy: { $in: [to] } }, { to: { $in: [sentBy] } }] }] }).sort('created'); // .limit(8);
  query.exec((err, docs) => {
    if (err) {
      callback(err);
    } else {
      callback(docs);
    }
  });
};

// returns all users where their username is in a list a list of friend names
// created testList because the $in operator won't work on an array of objects
const loadFriendsList = (username, callback) => {
  User.findOne({ username }, (err, user) => {
    const friendsList = user.friends;
    const testList = [];
    friendsList.forEach((friend) => {
      testList.push(friend.username);
    });
    const query = User.find({ username: { $in: testList } });
    query.exec((error, friends) => {
      if (error) {
        callback(err);
      } else {
        callback(friends);
      }
    });
  });
};

const getCurrentUser = currentId => User.findOne({ _id: currentId });

const getDecksForUser = userId => Decks.find({ userId });

const getFlashcardsForUser = userId => Flashcards.find({ userId });

const updateNote = (noteInfo) => {
  console.log('note info for update: ', noteInfo);

  return (

    Note.update({ _id: noteInfo.noteId }, { $set: noteInfo }, (err, updatedNote) => {
      if (err) {
        console.error(err);
      } else {
        console.log('note updated!: ', updatedNote);
      }
    }));
};
module.exports = {
  updateNote,
  getUserName,
  loadChatHistory,
  loadFriendsList,
  getCurrentUser,
  getDecksForUser,
  getFlashcardsForUser,
};
