import { connect } from 'react-redux';
import UserProfile from './UserProfile';
import { removeCurrentUser, setCurrentUser } from '../actions/usersActions';

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  id: state.user.currentUser.userId,
});

const mapDispatchToProps = dispatch => ({
  removeCurrentUser: () => dispatch(removeCurrentUser()),
  setCurrentUser: userInfo => dispatch(setCurrentUser(userInfo)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfile);
