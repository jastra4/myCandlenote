import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Segment, Icon } from 'semantic-ui-react';

const DeckView = (props) => {
  const decks = Object.keys(props.decksById).map(key => props.decksById[key]);
  console.log(decks);

  return (
    <div>
      <p>You have {decks.length} decks!</p>
      <Card.Group itemsPerRow={4}>
        {decks.map(deck => (
          <Card
            key={deck.id}
            raised
            onClick={() => {
              props.setCurrentDeck(deck.id);
              props.history.push('/flashcards');
            }}
          >
            <Card.Content>
              <Icon floated="right" size="mini" name="remove" onClick={() => props.deleteDeck(deck.id)} />
              <Segment stacked>
                Subject: {deck.subject}
                Title: {deck.title}
              </Segment>
            </Card.Content>
          </Card>))}
      </Card.Group>
    </div>
  );
};

export default withRouter(DeckView);
