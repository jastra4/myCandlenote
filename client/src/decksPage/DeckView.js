import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Segment, Icon, Header } from 'semantic-ui-react';

const deckStyle = {
  fontSize: '130%',
  overflowWrap: 'break-word',
};

const DeckView = (props) => {
  const decks = Object.keys(props.decksById).map(key => props.decksById[key]);
  console.log(decks);

  return (
    <div>
      <Segment>
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
                <Icon floated="right" name="remove" onClick={() => props.deleteDeck(deck.id)} />
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
                  <p style={deckStyle}>
                    {deck.title}
                  </p>
                </Segment>
                <Card.Meta>
                  Subject: {deck.subject}
                </Card.Meta>
              </Card.Content>
            </Card>))}
        </Card.Group>
      </Segment>
    </div>
  );
};

export default withRouter(DeckView);
