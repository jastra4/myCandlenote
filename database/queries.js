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
  const query = db.Messages.find({}).sort('created').limit(6);
  query.exec((err, docs) => {
    if (err) {
      callback(err);
    }
    callback(docs);
  });
  // db.Messages.find({}, (err, messages) => {
  //   if (err) {
  //     callback(err);
  //   } else {
  //     callback(messages);
  //   }
  // });
};

module.exports = {
  getUserName,
  getMessages,
};
