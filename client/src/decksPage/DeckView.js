import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Segment, Icon } from 'semantic-ui-react';

const DeckView = (props) => {
  const decks = Object.keys(props.decksById).map(key => props.decksById[key]);
  console.log(decks);

  return (
    <div>
      <p>You have {decks.length} decks!</p>
      <Segment>
        <Card.Group itemsPerRow={4}>
          {decks.map(deck => (
            <Card
              key={deck.id}
              raised
            >
              <Card.Content>
                <Icon floated="right" name="remove" onClick={() => props.deleteDeck(deck.id)} />
                <Segment
                  stacked
                  onClick={() => {
                    props.setCurrentDeck(deck.id);
                    props.history.push('/flashcards');
                  }}
                >
                  <p>
                    Subject: {deck.subject}
                    <br></br>
                    Title: {deck.title}
                  </p>
                </Segment>
              </Card.Content>
            </Card>))}
        </Card.Group>
      </Segment>
    </div>
  );
};

export default withRouter(DeckView);
