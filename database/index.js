const mongoose = require('mongoose');

const URI = process.env.MONGOLAB_RED_URI || 'mongodb://localhost/candle';

mongoose.connect(URI);
const db = mongoose.connection;

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

module.exports = {
  db,
  Decks,
  Flashcards,
  Notes,
  Videos,
};
