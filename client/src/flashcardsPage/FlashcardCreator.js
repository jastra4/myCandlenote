import React from 'react';
import { v1 } from 'uuid';

const mapDecksToOptions = decksById => (
  Object.keys(decksById).map(key => (
    <option value={decksById[key].id} key={key}>{decksById[key].title}</option>
  ))
);

class FlashcardCreator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      front: '',
      back: '',
      selectedDeck: '',
    };
  }

  onFrontChange(e) {
    this.setState({ front: e.target.value });
  }

  onBackChange(e) {
    this.setState({ back: e.target.value });
  }

  onDeckChange(e) {
    this.setState({ selectedDeck: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.addFlashcard({
      front: this.state.front,
      back: this.state.back,
      deckId: this.props.currentDeck.id,
      id: v1(),
    });
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.onSubmit.bind(this)}
        >
          <input type="text" placeholder="front" onChange={this.onFrontChange.bind(this)} />
          <input type="text" placeholder="back" onChange={this.onBackChange.bind(this)} />
          <select onChange={this.onDeckChange.bind(this)}>
            {mapDecksToOptions(this.props.decksById)}
          </select>
          <button type="submit">
            Add Flashcard
          </button>
        </form>
      </div>
    );
  }
}

export default FlashcardCreator;
