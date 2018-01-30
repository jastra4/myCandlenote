import React from 'react';
import { Segment, Header, Icon, Card, Divider } from 'semantic-ui-react';

import FlashcardCreator from './FlashcardCreator';
import FlashcardView from './FlashcardView';
import DeckListVert from '../decksPage/DeckListVertContainer';

const styles = {
  containerDiv: {
    padding: '2em',
    lineHeight: '100%',
  },
  headerContainer: {
    display: 'inline-block',
    verticalAlign: 'top',
    width: '28%',
    maxWidth: '130px',
    marginTop: '20vh',
    // marginRight: '2vw',
  },
  sideBar: {
    paddingLeft: '2em',
    marginTop: '40px',
    display: 'inline-block',
    width: '25%',
    verticalAlign: 'top',
  },
  mainSegment: {
    display: 'inline-block',
    width: '70%',
    lineHeight: '100%',
  },
};

const FlashcardPage = props => (
  <div style={styles.containerDiv}>
    <Segment size="massive">
      <div style={styles.mainSegment}>
        <div style={styles.headerContainer}>
          <Header as='h2' icon>
            <Icon name='clone' />
              Deck:
              <Header.Subheader>
              {props.currentDeck.title || 'No Deck Selected'}
            </Header.Subheader>
          </Header>
        </div>
        <FlashcardView
          cards={props.cards}
          currentDeck={props.currentDeck}
        />
        <Divider />
        <Header as="h2">Create New Flashcards</Header>
        <FlashcardCreator
          currentDeck={props.currentDeck}
          addFlashcard={props.addFlashcard}
          createFlashcard={props.createFlashcard}
          decksById={props.decksById}
        />
      </div>

      <div style={styles.sideBar}>
        <Card>
          <Card.Content>
            <Card.Header textAlign="center">
              Decks
              </Card.Header>
              <DeckListVert />
          </Card.Content>
        </Card>
      </div>
    </Segment>
  </div>
);

export default FlashcardPage;
