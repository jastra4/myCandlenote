import React from 'react';
import { Segment, Header, Icon, Card, Divider } from 'semantic-ui-react';

import FlashcardCreator from './FlashcardCreatorContainer';
import FlashcardView from './FlashcardViewContainer';
import DeckListVert from '../decksPage/DeckListVertContainer';

const styles = {
  containerDiv: {
    padding: '2em',
    veritcalAlign: 'top',
  },
  headerContainer: {
    position: 'relative',
    top: '1vh',
    display: 'inline-block',
    width: '30%',
  },
  sideBar: {
    paddingLeft: '2em',
    display: 'inline-block',
    width: '25%',
    position: 'relative',
    top: '-100vh',
  },
  mainSegment: {
    display: 'inline-block',
    width: '70%',
  },
};

const FlashcardPage = () => {
  return (

    <div style={styles.containerDiv}>
      <Segment size="massive">
        <div style={styles.mainSegment}>
          <div style={styles.headerContainer}>
            <Header as='h2' icon>
              <Icon name='clone' />
                Deck:
                <Header.Subheader>
                {/* {this.props.currentDeck.title} */}
              </Header.Subheader>
            </Header>
          </div>
          <FlashcardView />
          <Divider />
          <Header as="h2">Create New Flashcards</Header>
          <FlashcardCreator />
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
};

export default FlashcardPage;
