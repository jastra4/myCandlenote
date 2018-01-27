import React from 'react';
import { Card, Segment, Icon, Menu, Header } from 'semantic-ui-react';

const DeckListVert = (props) => {
  const decks = Object.keys(props.decksById).map(key => props.decksById[key]);

  return (
    <div>
      <Header as="h1">Decks:</Header>
      <Card.Group itemsPerRow={1}>
        {decks.map(deck => (
          <Card
            fluid={true}
            header={deck.title}
            onClick={() => {
              console.log('Deck:', deck.id);
              props.setCurrentDeck(deck.id);
            }}
          />
        ))}
      </Card.Group>
    </div>
  );
};

export default DeckListVert;
