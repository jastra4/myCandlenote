const mongoose = require('mongoose');
const { Decks, Flashcards, User, Note, Session, Groups } = require('./index');
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

const loadChatHistory = (sentBy, to, callback) => {
  const query = db.Messages.find({ $or: [{ $and: [{ sentBy: { $in: [sentBy] } },
    { to: { $in: [to] } }] },
  { $and: [{ sentBy: { $in: [to] } },
    { to: { $in: [sentBy] } }] }] }).sort('-created').limit(30);
  query.exec((err, docs) => {
    if (err) {
      callback(err);
    } else {
      docs.reverse();
      callback(docs);
    }
  });
};

const loadGroupChatHistory = (groupname, callback) => {
  const query = db.Messages.find({ to: { $in: [groupname] } }).sort('-created').limit(30);
  query.exec((err, docs) => {
    if (err) {
      callback(err);
    } else {
      docs.reverse();
      callback(docs);
    }
  });
};

// used to find unread messages later
const loadMyMessages = (myName, chatName, callback) => {
  const query = db.Messages.find({ $and: [{ sentBy: { $in: [chatName] } }, { to: { $in: [myName] } }] }).sort('-created').limit(30);
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
  User.findOne({ username }, (err, user) => {
    const { privateChats } = user;
    const testList = [];
    privateChats.forEach((chatWith) => {
      testList.push(chatWith.username);
    });
    const query = User.find({ username: { $in: testList } }).sort('-lastUpdate');
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
    const query = Groups.find({ groupname: { $in: testList } }).sort('-lastUpdate');
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

// const updateNote = (noteInfo) => {
//   const updatedNoteInfo = {
//     ...noteInfo,
//     modifiedAt: Date.now(),
//   };

//   return (

//     Note.update({ _id: noteInfo.noteId }, { $set: updatedNoteInfo }, (err) => {
//       if (err) { console.error(err); }
//     }));
// };

const getNotes = authorID => Note.find({ authorID }).sort('-modifiedAt');
const getRefreshToken = userId => User.findOne({ _id: userId });

const getAccessToken = userId => User.findOne({ _id: userId }, 'googleAccessToken');

const getGetAccessTokensForUsers = (userIds) => {
  const mongoIds = userIds.map(id => mongoose.Types.ObjectId(id));
  return User.find({ _id: { $in: mongoIds } });
};

const getFriendsById = (friendIds) => {
  const mongoIds = friendIds.map(id => mongoose.Types.ObjectId(id));
  return User.find({ _id: { $in: mongoIds } });
};

const getUserByUsername = username => User.findOne({ username });

const getPacket = _id => Note.find({ _id });

const getUsernameById = _id => User.findOne({ _id }).select('username');

const getTitleById = _id => Note.findOne({ _id }).select('title');

const getUserByCookie = cookie => Session.findOne({ _id: cookie }).select('session').catch((e) => { console.error(e); });

module.exports = {
  getUserByCookie,
  getTitleById,
  getUsernameById,
  getPacket,
  getNotes,
  // updateNote,
  getUserName,
  loadChatHistory,
  loadPrivateChats,
  loadGroupChats,
  getCurrentUser,
  getDecksForUser,
  getFlashcardsForUser,
  loadGroupChatHistory,
  getRefreshToken,
  getAccessToken,
  getGetAccessTokensForUsers,
  getFriendsById,
  getUserByUsername,
  loadMyMessages,
};
