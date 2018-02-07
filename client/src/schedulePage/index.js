import { connect } from 'react-redux';
import SchedulePage from './SchedulePage';
import { getFriends } from '../actions/usersActions';

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  userId: state.user.currentUser.userId,
});

const mapDisptachToProps = dispatch => ({ getFriends: userId => dispatch(getFriends(userId)) });

export default connect(
  mapStateToProps,
  mapDisptachToProps,
)(SchedulePage);
