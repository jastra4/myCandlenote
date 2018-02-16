import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Icon, Header } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';

const styles = {
  deckStyle: {
    display: 'table-cell',
    fontSize: '1.6em',
    overflowWrap: 'break-word',
    textAlign: 'center',
    verticalAlign: 'middle',
    height: '5em',
  },
  deckTable: {
    display: 'table',
    margin: '0 auto',
  },
  container: { padding: '5em' },
};

const DeckView = (props) => {
  const decks = Object.keys(props.decksById).map(key => props.decksById[key]);

  return (
    <div>
        <div className="deck-view-container">
          <Header as='h2' icon textAlign="center">
            <Icon name='clone' />
            Decks
            <Header.Subheader>
              Select a deck to view.
            </Header.Subheader>
          </Header>
          <br></br>
          <br></br>

        <MediaQuery minWidth={900}>
          <Card.Group itemsPerRow={4}>
            {decks.map(deck => (
              <Card
                key={deck.id}
              >
                <Card.Content>
                  <div onClick={() => props.deleteDeck(deck.id)} style={{ cursor: 'pointer' }}>
                    <Icon name="remove" />
                  </div>
                  <Card
                    color="brown"
                    onClick={() => {
                      props.setCurrentDeck(deck.id);
                      props.history.push('/flashcards');
                    }}
                  >
                    <div style={styles.deckTable}>
                      <p style={styles.deckStyle}>
                        {deck.title}
                      </p>
                    </div>
                  </Card>
                  <Card.Meta>
                    Subject: {deck.subject}
                  </Card.Meta>
                </Card.Content>
              </Card>))}
          </Card.Group>
        </MediaQuery>

        <MediaQuery maxWidth={899}>
          <Card.Group itemsPerRow={2}>
            {decks.map(deck => (
              <Card
                key={deck.id}
              >
                <Card.Content>
                  <div onClick={() => props.deleteDeck(deck.id)} style={{ cursor: 'pointer' }}>
                    <Icon name="remove" />
                  </div>
                  <Card
                    color="brown"
                    onClick={() => {
                      props.setCurrentDeck(deck.id);
                      props.history.push('/flashcards');
                    }}
                  >
                    <div style={styles.deckTable}>
                      <p style={styles.deckStyle}>
                        {deck.title}
                      </p>
                    </div>
                  </Card>
                  <Card.Meta>
                    Subject: {deck.subject}
                  </Card.Meta>
                </Card.Content>
              </Card>))}
          </Card.Group>
        </MediaQuery>
        </div>
    </div>
  );
};

export default withRouter(DeckView);
