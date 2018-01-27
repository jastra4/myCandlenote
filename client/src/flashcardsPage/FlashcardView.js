import React from 'react';
import ReactCardFlip from 'react-card-flip';
import { Segment, Button, Icon, Checkbox } from 'semantic-ui-react';

const styles = {
  cardText: {
    height: '100%',
    width: '100%',
    fontSize: '2em',
  },
  cardButtons: { marginTop: '1em' },
  paddingDiv: { height: '160px' },
  mainDiv: {
    padding: '20px 4vw',
    height: '35vw',
    display: 'inline-block',
    width: '70%',
  },
  flipCard: {
    display: 'inline-block',
    width: '75%',
    paddingTop: '3vh',
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
      checked: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      flipped: false,
      cards: nextProps.cards.length ? nextProps.cards : [this.defaultCard],
    });
  }

  onCheckboxChange(e, data) {
    this.setState({ checked: data.checked });
  }

  flipCard() {
    if (this.state.checked) {
      this.setState({
        flipped: !this.state.flipped,
        index: this.state.index + 0.5,
      });
    } else {
      this.setState({ flipped: !this.state.flipped });
    }
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
      <div style={styles.mainDiv}>
        <div onClick={() => this.flipCard()} style={styles.flipCard}>
          <ReactCardFlip isFlipped={this.state.flipped} infinite={true} onClick={() => {
            console.log(this.state);
            this.flipCard();
          }}>
            <Segment key="front">
              <p style={styles.cardText}>{cards[Math.floor(index % cards.length)].front}</p>
            </Segment>
            <Segment key="back">
              <p style={styles.cardText}>{cards[Math.floor(index % cards.length)].back}</p>
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
          <Checkbox label="Auto Flip to next card" onChange={this.onCheckboxChange.bind(this)} size="big" />
        </div>
      </div>
    );
  }
}

export default FlashcardView;
