import React from 'react';
import { Card } from 'semantic-ui-react';

const styles = {
  cardTitle: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: 'black',
    overflowWrap: 'break-word',
  },
  container: {
    paddingTop: '1em',
    paddingBottom: '15px',
    width: '25em',
  },
  cardMeta: {
    fontSize: '1em',
    color: 'gray',
    marginBottom: '5px',
    marginLeft: '5px',
  },
  cardContent: {
    paddingTop: '10px',
    paddingLeft: '8px',
    width: '10em',
    height: '5em',
    fontSize: '15px',
  },
};

const DeckListVert = (props) => {
  const decks = Object.keys(props.decksById).map(key => props.decksById[key]);

  return (
    <div style={styles.container}>
      <Card.Group itemsPerRow={1}>
        {decks.map(deck => (
          <Card
            key={deck.id}
            fluid={true}
            onClick={() => props.setCurrentDeck(deck.id)}
          >
          <div style={styles.cardContent}>
            <Card.Content>
              <p style={styles.cardTitle}>{deck.title}</p>
            </Card.Content>
            <Card.Meta>
              <p style={styles.cardMeta}>
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
