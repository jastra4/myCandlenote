import { connect } from 'react-redux';

import DeckView from './DeckView';
import { setCurrentDeck, deleteDeck } from '../actions/decksActions';

const mapStateToProps = state => ({ decksById: state.decks.byId });

const mapDispatchToProps = dispatch => ({
  setCurrentDeck: deckId => dispatch(setCurrentDeck(deckId)),
  deleteDeck: deckId => deleteDeck(deckId),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeckView);
