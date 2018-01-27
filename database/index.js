const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_RED_URI);
export const db = mongoose.connection;

export const decksSchema = mongoose.Schema({
  subject: String,
  title: String,
  userId: String,
});

export const decks = mongoose.model('decks', decksSchema);

export const flashcardsSchema = mongoose.Schema({
  deckId: Number,
  front: String,
  back: String,
});

export const flashcards = mongoose.model('flashcards', flashcardsSchema);

export const notesSchema = mongoose.Schema({
  subject: String,
  heading: String,
  body: String,
});

export const notes = mongoose.model('notes', notesSchema);

export const videosSchema = mongoose.Schema({
  title: String,
  url: String,
  starred: Boolean,
});

export const videos = mongoose.model('videos', videosSchema);
