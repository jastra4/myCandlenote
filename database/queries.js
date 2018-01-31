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
  console.log('query from: ', sentBy);
  console.log('query to: ', to);
  // const query = db.Messages.find({}).where().equals(sentBy).where().equals(to).sort('created').limit(6);

  const query = db.Messages.find({ $or: [{ $and: [{ sentBy: { $in: [sentBy] } }, { to: { $in: [to] } }] }, { $and: [{ sentBy: { $in: [to] } }, { to: { $in: [sentBy] } }] }] }).sort('created').limit(6);
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
