const User = require('../server/models/user-model');
const { Decks, Flashcards, Groups } = require('./index');
const db = require('./index');

const getUserName = (id, callback) => {
  User.findOne({ _id: id }, (err, person) => {
    if (err) {
      callback(false);
    } else {
      callback(person.username);
    }
  });
};

// only difference for groups is that "to" will be a group name
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

const loadGroupChatHistory = (groupname, callback) => {
  const query = db.Messages.find({ to: { $in: [groupname] } }).sort('created'); // .limit(8);
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
const loadPrivateChats = (username, callback) => {
  console.log('loadPrivateChats for ', username);
  User.findOne({ username }, (err, user) => {
    const { privateChats } = user;
    const testList = [];
    privateChats.forEach((chatWith) => {
      testList.push(chatWith.username);
    });
    const query = User.find({ username: { $in: testList } });
    query.exec((error, listOfUsersInPrivateChatList) => {
      if (error) {
        callback(err);
      } else {
        callback(listOfUsersInPrivateChatList);
      }
    });
  });
};

// returns all users where their username is in a list a list of friend names
// created testList because the $in operator won't work on an array of objects
const loadGroupChats = (username, callback) => {
  User.findOne({ username }, (err, user) => {
    const groupChatList = user.groupChats;
    const testList = [];
    groupChatList.forEach((group) => {
      testList.push(group.groupname);
    });
    const query = Groups.find({ groupname: { $in: testList } });
    query.exec((error, groups) => {
      if (error) {
        console.log(error);
        callback(err);
      } else {
        callback(groups);
      }
    });
  });
};

const getCurrentUser = currentId => User.findOne({ _id: currentId });

const getDecksForUser = userId => Decks.find({ userId });

const getFlashcardsForUser = userId => Flashcards.find({ userId });

module.exports = {
  getUserName,
  loadChatHistory,
  loadPrivateChats,
  loadGroupChats,
  getCurrentUser,
  getDecksForUser,
  getFlashcardsForUser,
  loadGroupChatHistory,
};
