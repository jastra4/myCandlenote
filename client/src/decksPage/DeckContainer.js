import { connect } from 'react-redux';

import Deck from './index';
import { addDeck, setCurrentDeck, deleteDeck } from '../actions/decksActions';

const mapStateToProps = state => ({
  decksById: state.decks.byId,
  userId: state.user.userId,
});

const mapDispatchToProps = dispatch => ({
  setCurrentDeck: deckId => dispatch(setCurrentDeck(deckId)),
  deleteDeck: deckId => dispatch(deleteDeck(deckId)),
  addDeck: deckInfo => dispatch(addDeck(deckInfo)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Deck);
