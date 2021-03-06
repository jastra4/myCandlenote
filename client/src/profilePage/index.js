import { connect } from 'react-redux';
import UserProfile from './UserProfile';
import { removeCurrentUser, setCurrentUser, getFriends, getFriend, removeFriend } from '../actions/usersActions';
import { setDecks } from '../actions/decksActions';
import { setFlashcards } from '../actions/flashcardsActions';

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  id: state.user.currentUser.userId,
});

const mapDispatchToProps = dispatch => ({
  removeCurrentUser: () => dispatch(removeCurrentUser()),
  setCurrentUser: userInfo => dispatch(setCurrentUser(userInfo)),
  setDecks: decks => dispatch(setDecks(decks)),
  setFlashcards: flashcards => dispatch(setFlashcards(flashcards)),
  getFriends: userId => dispatch(getFriends(userId)),
  getFriend: friendId => dispatch(getFriend(friendId)),
  removeFriend: friendId => dispatch(removeFriend(friendId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfile);
