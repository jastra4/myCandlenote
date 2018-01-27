const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_RED_URI);
// const db = mongoose.connection;

// const decks = mongoose.Schema({
//   subject: String,
//   title: String,
// });

// const flashcards = mongoose.Schema({
//   deckId: Number,
//   front: String,
//   back: String,
// });

// const notes = mongoose.Schema({
//   subject: String,
//   heading: String,
//   body: String,
// });

// const videos = mongoose.Schema({
//   title: String,
//   url: String,
//   starred: Boolean,
// });
