const { Flashcards, Decks, User } = require('./index');

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

const removeFriendById = (userId, friendId) => User.findOne({ userId })
  .then((user) => {
    user.friends.pull({ friendId });
  });

module.exports = {
  deleteDeck,
  deleteFlashcard,
  removeFriend,
  removeFriendById,
};
