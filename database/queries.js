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
  console.log('loadChatHistory: ', sentBy);
  console.log(to);
  const query = db.Messages.find({ $or: [{ $and: [{ sentBy: { $in: [sentBy] } }, { to: { $in: [to] } }] }, { $and: [{ sentBy: { $in: [to] } }, { to: { $in: [sentBy] } }] }] }).sort('created'); // .limit(8);
  query.exec((err, docs) => {
    if (err) {
      callback(err);
    } else {
      console.log('docs: ', docs);
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
      console.log('chatWith.username: ', chatWith.username);
      console.log('chatWith: ', chatWith);
      testList.push(chatWith.username);
    });
    console.log('testList: ', testList);
    const query = User.find({ username: { $in: testList } });
    query.exec((error, listOfUsersInPrivateChatList) => {
      if (error) {
        callback(err);
      } else {
        console.log('loadPrivateChats: ', listOfUsersInPrivateChatList);
        callback(listOfUsersInPrivateChatList);
      }
    });
  });
};

// returns all users where their username is in a list a list of friend names
// created testList because the $in operator won't work on an array of objects
const loadGroupChats = (username, callback) => {
  console.log('loadGroupChats: ', username);
  User.findOne({ username }, (err, user) => {
    console.log('user.groupchats: ', user.groupChats);
    const groupChatList = user.groupChats;
    const testList = [];
    groupChatList.forEach((group) => {
      testList.push(group.groupname);
    });
    console.log('testListGroups: ', testList);
    const query = Groups.find({ groupname: { $in: testList } });
    query.exec((error, groups) => {
      if (error) {
        console.log(error);
        callback(err);
      } else {
        console.log('groups: ', groups);
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
};
