const { Flashcards, Decks, Messages } = require('./index');
const User = require('../server/models/user-model');
const db = require('./index');

const insertFlashcard = ({ front, back, deckId }) => (
  new Flashcards({
    front,
    back,
    deckId,
  }).save()
);

const insertDeck = ({ subject, title, userId }) => (
  new Decks({
    subject,
    title,
    userId,
  }).save()
);

const insertMessage = ({ to, sentBy, text, timeStamp }) => {
  // console.log('insert: ');
  // console.log(to);
  // console.log(sentBy);
  // console.log(text);
  // console.log(timeStamp);
  new Messages({
    to,
    sentBy,
    text,
    timeStamp,
  }).save();
};

const addFriend = (id, newFriend, callback) => {
  console.log('insertFriend:');
  console.log(id);
  console.log(newFriend);
  // update my friends list
  User.findById(id, (err, user) => {
    if (err) {
      callback('error finding user');
    }
    user.friends.push(newFriend);
    user.save((error) => {
      if (error) {
        callback('error saving');
      } else {
        callback('Added friend!');
      }
    });
  });
};

// db.inventory.updateOne(
//    { item: "paper" },
//    {
//      $set: { "size.uom": "cm", status: "P" },
//      $currentDate: { lastModified: true }
//    }
// )

module.exports = {
  insertDeck,
  insertFlashcard,
  insertMessage,
  addFriend,
};
