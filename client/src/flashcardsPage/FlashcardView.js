import React from 'react';
import ReactCardFlip from 'react-card-flip';
import { Segment, Button, Icon, Checkbox } from 'semantic-ui-react';

const styles = {
  cardText: {
    height: '13em',
    width: '100%',
    fontSize: '2em',
    display: 'table-cell',
    verticalAlign: 'middle',
    padding: '10px',
  },
  cardImage: {
    maxWidth: '100%',
    height: 'auto',
  },
  cardButtons: { marginTop: '1em' },
  paddingDiv: { height: '30em' },
  mainDiv: {
    padding: '20px 1vw',
    height: '35vh',
    display: 'inline-block',
    width: '70%',
  },
  flipCard: {
    display: 'inline-block',
    width: '100%',
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
    if (this.state.checked && this.state.flipped) {
      this.changeIndex(1);
    } else {
      this.setState({ flipped: !this.state.flipped });
    }
  }

  changeIndex(amount) {
    if (this.state.index === 0 && amount < 0) {
      this.setState({ flipped: false }, () => setTimeout(() => {
        this.setState({ index: this.state.cards.length - 1 });
      }, 200));
    } else if (this.state.flipped) {
      this.setState({ flipped: false }, () => setTimeout(() => {
        this.setState({ index: this.state.index + amount });
      }, 200));
    } else {
      this.setState({ index: this.state.index + amount });
    }
  }

  render() {
    const { cards, index } = this.state;
    return (
      <div style={styles.mainDiv} className="flashcard-view-main">
        <div onClick={() => this.flipCard()} style={styles.flipCard}>
          <ReactCardFlip
            isFlipped={this.state.flipped}
            infinite={true}
            onClick={() => this.flipCard()}
          >
            <Segment key="front">
              {cards[index % cards.length].front.slice(0, 11) === 'data:image/' ?
                <img src={cards[index % cards.length].front} /> :
                <p style={styles.cardText}>{cards[index % cards.length].front}</p>}
            </Segment>
            <Segment key="back">
              {cards[index % cards.length].back.slice(0, 11) === 'data:image/' ?
                <img src={cards[index % cards.length].back} /> :
                <p style={styles.cardText}>{cards[index % cards.length].back}</p>}
            </Segment>
          </ReactCardFlip>
        </div>

        <div style={styles.paddingDiv}></div>

        <div style={styles.cardButtons}>
          <Button animated onClick={() => this.changeIndex(-1)} size="big" attach="bottom">
            <Button.Content visible>Prev Card</Button.Content>
            <Button.Content hidden>
              <Icon name='left arrow' />
            </Button.Content>
          </Button>
          <Button animated onClick={() => this.changeIndex(1)} size="big" attach="bottom">
            <Button.Content visible>Next Card</Button.Content>
            <Button.Content hidden>
              <Icon name='right arrow' />
            </Button.Content>
          </Button>
          <br></br>
          <Checkbox label="Auto Flip to next card" onChange={this.onCheckboxChange.bind(this)} size="big" />
        </div>
      </div>
    );
  }
}

export default FlashcardView;
