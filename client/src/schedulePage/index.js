import { connect } from 'react-redux';
import SchedulePage from './SchedulePage';

const mapStateToProps = state => ({ userId: state.user.currentUser.userId });

export default connect(mapStateToProps)(SchedulePage);
