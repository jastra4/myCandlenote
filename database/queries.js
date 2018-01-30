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

const getMessages = (callback) => {
  console.log('getMessages invoked: ', db.Messages);
  db.Messages.find({}, (err, messages) => {
    if (err) {
      callback(err);
    } else {
      callback(messages);
    }
  });
};

module.exports = {
  getUserName,
  getMessages,
};
