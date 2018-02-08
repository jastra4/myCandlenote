const mongoose = require('mongoose');

const URI = process.env.MONGOLAB_RED_URI || 'mongodb://localhost/candle';

mongoose.connect(URI);
const db = mongoose.connection;

const userSchema = new mongoose.Schema({
  username: String,
  googleId: String,
  profileImage: String,
  googleAccessToken: String,
  googleRefreshToken: String,
  privateChats: [],
  groupChats: [],
  friends: [{
    friendId: String,
    status: String,
    _id: false,
  }],
});

const User = mongoose.model('user', userSchema);

const decksSchema = mongoose.Schema({
  subject: String,
  title: String,
  userId: String,
});

const Decks = mongoose.model('decks', decksSchema);

const flashcardsSchema = mongoose.Schema({
  deckId: String,
  front: String,
  back: String,
  userId: String,
});

const Flashcards = mongoose.model('flashcards', flashcardsSchema);

const notesSchema = mongoose.Schema({
  subject: String,
  heading: String,
  body: String,
});

const Notes = mongoose.model('notes', notesSchema);

const videosSchema = mongoose.Schema({
  title: String,
  url: String,
  starred: Boolean,
});

const Videos = mongoose.model('videos', videosSchema);

const messagesSchema = mongoose.Schema({
  to: String,
  sentBy: String,
  text: String,
  timeStamp: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

const Messages = mongoose.model('messages', messagesSchema);

const groupsSchema = mongoose.Schema({
  groupname: String,
  members: [],
});

const Groups = mongoose.model('groups', groupsSchema);

module.exports = {
  db,
  User,
  Decks,
  Flashcards,
  Notes,
  Videos,
  Messages,
  Groups,
};
