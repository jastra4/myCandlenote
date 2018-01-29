import { connect } from 'react-redux';

import DeckListVert from './DeckListVert';
import { setCurrentDeck } from '../actions/decksActions';

const mapStateToProps = state => ({ decksById: state.decks.byId });

const mapDispatchToProps = dispatch => (
  { setCurrentDeck: deckId => dispatch(setCurrentDeck(deckId)) });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeckListVert);
