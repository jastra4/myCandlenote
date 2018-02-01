import React from 'react';
import { Grid } from 'semantic-ui-react';
import DeckCreator from './DeckCreator';
import DeckView from './DeckView';

const Deck = props => (
  <Grid columns={15}>
    <Grid.Row>
      <div style={{ width: '100%' }}>
        <DeckView
          decksById={props.decksById}
          setCurrentDeck={props.setCurrentDeck}
          deleteDeck={props.deleteDeck}
        />
      </div>
    </Grid.Row>
    <Grid.Row>
        <div style={{ width: '100%' }}>
          <DeckCreator
            createDeck={props.createDeck}
            userId={props.userId}
            addDeck={props.addDeck}
          />
        </div>
    </Grid.Row>
  </Grid>
);

export default Deck;
