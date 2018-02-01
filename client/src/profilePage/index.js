import { connect } from 'react-redux';
import UserProfile from './UserProfile';
import { removeCurrentUser } from '../reducers/usersReducers';

const mapStateToProps = state => ({
  user: state.user,
  id: state.user.userId,
});

const mapDispatchToProps = dispatch => ({ removeCurrentUser: () => dispatch(removeCurrentUser) });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfile);
