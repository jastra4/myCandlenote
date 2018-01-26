import React from 'react';
import ReactCardFlip from 'react-card-flip';
import { Segment, Button, Header, Icon } from 'semantic-ui-react';

const styles = {
  containerDiv: {
    padding: '2vw',
  },
  cardText: {
    fontSize: '5em',
  },
  cardButtons: {
    marginTop: '10vw',
  },
  paddingDiv: {
    height: '160px',
  },
  mainDiv: {
    padding: '1vw 4vw',
    height: '35vw',
  },
};

class FlashcardView extends React.Component {
  constructor(props) {
    super(props);

    this.defaultCard = {
      front: 'Sorry, there are no cards in this deck yet.',
      back: 'Once you add some cards, this one will disappear.',
    };

    this.state = {
      index: 0,
      cards: this.props.cards.length ? this.props.cards : [this.defaultCard],
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
    const { cards, index } = this.state;

    return (
      <div style={styles.containerDiv}>
        <Segment size="massive">
          <div style={styles.mainDiv}>
            <div onClick={() => this.flipCard()}>
              <ReactCardFlip isFlipped={this.state.flipped} infinite={true} onClick={() => {
                console.log(this.state);
                this.flipCard();
              }}>
                <Segment key="front">
                  <p style={styles.cardText}>{cards[index % cards.length].front}</p>
                </Segment>
                <Segment key="back">
                  <p style={styles.cardText}>{cards[index % cards.length].back}</p>
                </Segment>
              </ReactCardFlip>
            </div>

            <div style={styles.paddingDiv}></div>

            <div style={styles.cardButtons}>
              <Button animated onClick={() => this.changeIndex(1)} size="big" attach="bottom">
                <Button.Content visible>Prev Card</Button.Content>
                <Button.Content hidden>
                  <Icon name='left arrow' />
                </Button.Content>
              </Button>
              <Button animated onClick={() => this.changeIndex(-1)} size="big" attach="bottom">
                <Button.Content visible>Next Card</Button.Content>
                <Button.Content hidden>
                  <Icon name='right arrow' />
                </Button.Content>
              </Button>
            </div>
          </div>
        </Segment>
      </div>
    );
  }
}

export default FlashcardView;
