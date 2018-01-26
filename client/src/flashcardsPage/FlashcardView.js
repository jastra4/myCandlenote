import React from 'react';
import ReactCardFlip from 'react-card-flip';

class FlashcardView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      cards: this.props.cards,
      flipped: false,
    };
  }

  flipCard() {
    this.setState({ flipped: !this.state.flipped });
  }

  changeIndex(amount) {
    if (this.state.index === 0) {
      this.setState({ index: this.state.cards.length - 1 });
    } else {
      this.setState({ index: this.state.index + amount });
    }
  }

  render() {
    return (
      <div>
        <div>
          <button type="button" onClick={() => this.changeIndex(-1)}>Prev Card</button>
          <button type="button" onClick={() => this.changeIndex(1)}>Next Card</button>
        </div>
        <div onClick={() => {
          console.log(this.state);
          this.flipCard();
        }}>
          <ReactCardFlip isFlipped={this.state.flipped} infinite={true} onClick={() => {
            console.log(this.state);
            this.flipCard();
          }}>
            <h1 key="front">{this.state.cards[this.state.index % this.state.cards.length].front}</h1>
            <h1 key="back">{this.state.cards[this.state.index % this.state.cards.length].back}</h1>
          </ReactCardFlip>
        </div>
      </div>
    );
  }
}

export default FlashcardView;
