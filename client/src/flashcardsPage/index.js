import React from 'react';
import { Segment, Header, Icon, Card, Divider, Grid } from 'semantic-ui-react';

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
    marginTop: '13em',
    // marginRight: '2vw',
  },
  sideBar: {
    marginTop: '3.5em',
    position: 'relative',
    right: '-25px',
  },
  mainSegment: {
    display: 'inline-block',
    width: '70%',
    lineHeight: '100%',
  },
};

const FlashcardPage = props => (
  <div style={{marginLeft: '20px'}}>
    {/* <Segment size="massive"> */}
    <Grid>
      <Grid.Column width={13}>
        {/* <div style={styles.mainSegment}> */}
          <div style={styles.headerContainer}>
            <Header as='h2' icon>
              <Icon name='clone' />
              <h3>Deck:</h3>
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
        {/* </div> */}
      </Grid.Column>
      <Grid.Column width={3}>
        <div style={styles.sideBar}>
          <Card fluid>
            <Card.Content>
              <Card.Header textAlign="center">
                <h2>Decks</h2>
                </Card.Header>
                <DeckListVert />
            </Card.Content>
          </Card>
        </div>
      </Grid.Column>
    </Grid>
  </div>
);

export default FlashcardPage;
