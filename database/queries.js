const User = require('../server/models/user-model');
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

const loadFriendsList = (currentUser, callback) => {
  User.findOne({ username: currentUser }, (err, person) => {
    const myFriends = person.friends;
    const testList = [];
    myFriends.forEach((friend) => {
      testList.push(friend.username);
    });
    // returns all users found in my friends
    // const query = User.find({ username: { $in: myFriends } });
    const query = User.find({ username: { $in: testList } });
    query.exec((error, docs) => {
      if (error) {
        callback(err);
      } else {
        callback(docs);
      }
    });
  });
};

const getCurrentUser = currentId => User.findOne({ _id: currentId });

module.exports = {
  getUserName,
  loadChatHistory,
  loadFriendsList,
  getCurrentUser,
};
