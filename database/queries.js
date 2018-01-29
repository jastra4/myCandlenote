const User = require('../server/models/user-model');

const getUserName = (id, callback) => {
  User.findOne({ _id: id }, (err, person) => {
    if (err) {
  	  console.log('error: ', err);
  	  callback(err);
  	} else {
  	  console.log('person: ', person.username);
  	  callback(person.username);
  	}
  });
};

module.exports = {
  getUserName,
};
