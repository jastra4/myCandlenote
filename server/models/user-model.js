const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  googleId: String,
  profileImage: String,
  friends: [],
});

const User = mongoose.model('user', userSchema);

module.exports = User;
