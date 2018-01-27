import React from 'react';
import ReactCardFlip from 'react-card-flip';
import { Segment, Button, Header, Icon, Checkbox } from 'semantic-ui-react';

import DeckListVert from '../decksPage/DeckListVertContainer';

const styles = {
  containerDiv: {
    padding: '2vw',
    veritcalAlign: 'top',
  },
  headerContainer: {
    position: 'relative',
    top: '-10vh',
    display: 'inline-block',
  },
  cardText: {
    maxHeight: '100%',
    maxWidth: '100%',
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
    display: 'inline-block',
  },
  sideBar: {
    display: 'inline-block',
    width: '19%',
  },
  mainSegment: {
    display: 'inline-block',
    width: '80%',
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

  onCheckboxChange(e, data) {
    console.log(data);
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
    console.log('Current Deck:', this.props.currentDeck, 'd', this.props.cardsById, 'props', this.props);
    return (
      <div style={styles.containerDiv}>
          <Segment size="massive">
            <div style={styles.mainSegment}>
              <div style={styles.headerContainer}>
                <Header as='h2' icon>
                  <Icon name='clone' />
                  Deck:
                  <Header.Subheader>
                    {this.props.currentDeck.title}
                  </Header.Subheader>
                </Header>
              </div>
              <div style={styles.mainDiv}>
                <div onClick={() => this.flipCard()}>
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
            </div>
            <div style={styles.sideBar}>
              <DeckListVert />
            </div>
          </Segment>

      </div>
    );
  }
}

export default FlashcardView;
