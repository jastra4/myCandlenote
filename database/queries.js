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

const getMessages = (sentBy, to, callback) => {
  const query = db.Messages.find({ $or: [{ $and: [{ sentBy: { $in: [sentBy] } }, { to: { $in: [to] } }] }, { $and: [{ sentBy: { $in: [to] } }, { to: { $in: [sentBy] } }] }] }).sort('created'); // .limit(8);
  query.exec((err, docs) => {
    if (err) {
      callback(err);
    } else {
      callback(docs);
    }
  });
};

const getAllUsers = (currentUser, callback) => {
  const query = User.find({}); // change to search for friends
  // const query = User.find({ friends: { $elemMatch: { username: currentUser } } });
  query.exec((err, docs) => {
    if (err) {
      console.log('err: ', err);
      callback(err);
    } else {
      console.log('docs: ', docs);
      callback(docs);
    }
  });
};

const getCurrentUser = currentId => User.findOne({ _id: currentId });

module.exports = {
  getUserName,
  getMessages,
  getAllUsers,
  getCurrentUser,
};
