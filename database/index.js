const mongoose = require('mongoose');
const keys = require('../server/config/keys');

// const URI = process.env.MONGOLAB_RED_URI || 'mongodb://localhost/candle';
// mongoose.connect(URI);

mongoose.connect(keys.mongodb.dbURI)
  .then(() => { console.log('✅  Successfully connected to Mongodb'); })
  .catch((e) => { console.error('⚠️ Error connected to MongoDB: ', e); });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error: '));

const userSchema = new mongoose.Schema({
  username: String,
  googleId: String,
  profileImage: String,
  googleAccessToken: String,
  googleRefreshToken: String,
  friends: [{
    friendId: String,
    status: String,
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
  title: String,
  body: String,
  authorID: 'ObjectId',
  sharedWith: Array,
  createdAt: Date,
  modifiedAt: {
    type: Date,
    default: Date.now(),
  },
  showDate: {
    type: Boolean,
    default: true,
  },
  showTitle: {
    type: Boolean,
    default: true,
  },
  showName: {
    type: Boolean,
    default: true,
  },
});

const Note = mongoose.model('notes', notesSchema);

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

module.exports = {
  db,
  User,
  Decks,
  Flashcards,
  Note,
  Videos,
  Messages,
};
