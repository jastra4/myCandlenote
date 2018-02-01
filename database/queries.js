const User = require('../server/models/user-model');
const db = require('./index');

const getUserName = (id, callback) => {
  User.findOne({ _id: id }, (err, person) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      console.log('person: ', person.username);
      callback(person.username);
    }
  });
};

const getMessages = (sentBy, to, callback) => {
  const query = db.Messages.find({ $or: [{ $and: [{ sentBy: { $in: [sentBy] } }, { to: { $in: [to] } }] }, { $and: [{ sentBy: { $in: [to] } }, { to: { $in: [sentBy] } }] }] }).sort('created').limit(6);
  query.exec((err, docs) => {
    if (err) {
      callback(err);
    }
    callback(docs);
  });
};

const getUsers = (callback) => {
  console.log('getUsers ran');
  const query = User.find({});
  query.exec((err, docs) => {
    if (err) {
      callback(err);
    }
    callback(docs);
  });
};

const getCurrentUser = currentId => User.findOne({ _id: currentId });

module.exports = {
  getUserName,
  getMessages,
  getUsers,
  getCurrentUser,
};
