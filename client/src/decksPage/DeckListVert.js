import React from 'react';
import { Card } from 'semantic-ui-react';

const styles = {
  cardTitle: {
    fontSize: '1em',
    fontWeight: 'bold',
    color: 'black',
    overflowWrap: 'break-word',
  },
  container: {
    paddingTop: '1em',
    paddingBottom: '15px',
  },
  cardMeta: {
    fontSize: '11px',
    color: 'gray',
    marginBottom: '5px',
    marginLeft: '5px',
  },
};

const DeckListVert = (props) => {
  const decks = Object.keys(props.decksById).map(key => props.decksById[key]);

  return (
    <div style={styles.container}>
      <Card.Group itemsPerRow={1}>
        {decks.map(deck => (
          <Card
            fluid={true}
            onClick={() => {
              console.log('Deck:', deck.id);
              props.setCurrentDeck(deck.id);
            }}
          >
            <Card.Content>
              <p style={styles.cardTitle}>{deck.title}</p>
            </Card.Content>
            <Card.Meta>
              <p style={styles.cardMeta}>
                {deck.subject}
              </p>
            </Card.Meta>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
};

export default DeckListVert;
