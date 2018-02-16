import React from 'react';
import { Card } from 'semantic-ui-react';


const DeckListVert = (props) => {
  const decks = Object.keys(props.decksById).map(key => props.decksById[key]);

  return (
    <div className="deck-list-container">
      <Card.Group itemsPerRow={1} className="flashcard-deck-list">
        {decks.map(deck => (
          <Card
            key={deck.id}
            fluid={true}
            onClick={() => props.setCurrentDeck(deck.id)}
          >
          <div className="deck-list-card-content">
            <Card.Content>
              <p className="deck-list-card-title">{deck.title}</p>
            </Card.Content>
            <Card.Meta>
              <p className="deck-list-meta">
                {deck.subject}
              </p>
            </Card.Meta>
          </div>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
};

export default DeckListVert;
