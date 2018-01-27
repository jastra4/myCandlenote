import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Segment, Icon, Header } from 'semantic-ui-react';

const styles = {
  deckStyle: {
    fontSize: '130%',
    overflowWrap: 'break-word',
  },
  container: { padding: '5em' },
};

const DeckView = (props) => {
  const decks = Object.keys(props.decksById).map(key => props.decksById[key]);
  console.log(decks);

  return (
    <div>
      <Segment>
        <div style={styles.container}>
          <Header as='h2' icon textAlign="center">
            <Icon name='clone' />
            Decks
            <Header.Subheader>
              Select a deck to view.
            </Header.Subheader>
          </Header>
          <br></br>
          <Card.Group itemsPerRow={3}>
            {decks.map(deck => (
              <Card
                key={deck.id}
                raised
              >
                <Card.Content>
                  <div onClick={() => {
                    console.log('Delete button clicked');
                    props.deleteDeck(deck.id);
                  }}>
                    <Icon floated="right" name="remove" />
                  </div>
                  <Segment
                    color="brown"
                    textAlign="center"
                    padded
                    stacked
                    onClick={() => {
                      props.setCurrentDeck(deck.id);
                      props.history.push('/flashcards');
                    }}
                  >
                    <p style={styles.deckStyle}>
                      {deck.title}
                    </p>
                  </Segment>
                  <Card.Meta>
                    Subject: {deck.subject}
                  </Card.Meta>
                </Card.Content>
              </Card>))}
          </Card.Group>
        </div>
      </Segment>
    </div>
  );
};

export default withRouter(DeckView);
