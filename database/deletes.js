const { Flashcards, Decks } = require('./index');
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
      user.friends.pull(friend);
      user.save();
      callback(true);
    }
  });
};

module.exports = {
  deleteDeck,
  deleteFlashcard,
  removeFriend,
};
