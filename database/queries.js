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
  console.log('getMessages: ');
  console.log(sentBy);
  console.log(to);
  const query = db.Messages.find({ $or: [{ $and: [{ sentBy: { $in: [sentBy] } }, { to: { $in: [to] } }] }, { $and: [{ sentBy: { $in: [to] } }, { to: { $in: [sentBy] } }] }] }).sort('created'); // .limit(8);
  // const query = db.Messages.find({});
  query.exec((err, docs) => {
    if (err) {
      callback(err);
    }
    callback(docs);
  });
};

const getAllUsers = (currentUser, callback) => {
  // where my name is in they're friends list
  // const query = User.find({});
  console.log('Query friends for: ', currentUser);
  const query = User.find({ friends: { $elemMatch: { username: currentUser } } });
  // { results: { $elemMatch: { $gte: 80, $lt: 85 } } }
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
