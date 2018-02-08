const { Flashcards, Decks, Note } = require('./index');
const User = require('../server/models/user-model');

const deleteFlashcard = id => Flashcards.remove({ _id: id });

const deleteDeck = id => Decks.remove({ _id: id })
  .then(() => Flashcards.remove({ deckId: id }));

const removeFriend = (username, friend, callback) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      console.log(err);
      callback(false);
    } else {
      user.friends.pull({ username: friend });
      user.save();
      callback(friend);
    }
  });
};

const deleteNote = noteId => (
  Note.remove({ _id: noteId })
    .then(() => { console.log('Successfully deleted note: ', noteId); })
    .catch((e) => { console.error(e); })
);

module.exports = {
  deleteDeck,
  deleteFlashcard,
  removeFriend,
  deleteNote,
};
