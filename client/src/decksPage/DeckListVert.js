import React from 'react';
import { Card, Segment, Icon, Menu } from 'semantic-ui-react';

const DeckListVert = (props) => {
  const decks = Object.keys(props.decksById).map(key => props.decksById[key]);

  return (
    <div>
      <h4>Decks:</h4>
      <Menu vertical>
        {decks.map(deck => (
          <Menu.Item
            name={deck.title}
            onClick={() => {
              console.log('Deck:', deck.id);
              props.setCurrentDeck(deck.id);
            }
          }/>
        ))}
      </Menu>
    </div>
  );
};

export default DeckListVert;
