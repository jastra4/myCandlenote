import { connect } from 'react-redux';

import DeckView from './DeckView';
import { setCurrentDeck } from '../actions/decksActions';

const mapStateToProps = state => ({ userId: state.user.userId });

const mapDispatchToProps = dispatch => ({ addDeck: deckInfo => dispatch(addDeck(deckInfo)) });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeckCreator);
