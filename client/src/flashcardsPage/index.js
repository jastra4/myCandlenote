import React from 'react';
import { Header, Icon, Divider, Grid } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';

import FlashcardCreator from './FlashcardCreator';
import FlashcardView from './FlashcardView';
import DeckListVert from '../decksPage/DeckListVertContainer';
import './style.css';

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
    marginTop: '13em',
  },
  sideBar: {
    marginTop: '2.5em',
    position: 'relative',
    right: '-35px',
  },
  mainSegment: {
    display: 'inline-block',
    width: '70%',
    lineHeight: '100%',
  },
};

const FlashcardPage = props => (
  <div style={{ marginLeft: '20px' }}>
    <Grid columns="equal">
      <Grid.Column>
        <MediaQuery minWidth={900}>
          <div style={styles.headerContainer}>
            <Header as='h2' icon>
              <Icon name='clone' />
              <p style={{ width: '100%' }}>
                {props.currentDeck.title || 'No Deck Selected'}
              </p>
            </Header>
          </div>
        </MediaQuery>
        <MediaQuery maxWidth={899}>
          <Header textAlign="center" as="h4" style={{ marginTop: '2em' }}><Icon name="clone"/> {props.currentDeck.title || 'No Deck Selected'}</Header>
        </MediaQuery>
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
            currentUser={props.currentUser}
          />
      </Grid.Column>
      <MediaQuery minWidth={900}>
        <Grid.Column width={3}>
          <div style={styles.sideBar}>
            <Header as="h2">
              Decks
            </Header>
            <DeckListVert />
          </div>
        </Grid.Column>
      </MediaQuery>
    </Grid>
  </div>
);

export default FlashcardPage;
