import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

const UserData = props => (
  <Card raised className="user-data-container">
    <Card.Content className="user-data-deck-count user-data-count">
      <Card.Header as="h4">
        <Icon name="clone" /> {props.deckCount || '0'} Decks
      </Card.Header>
    </Card.Content>
    <Card.Content className="user-data-card-count user-data-count">
      <Card.Header as="h4">
        <Icon name="vcard outline" /> {props.flashcardCount || '0'} Flashcards
      </Card.Header>
    </Card.Content>
  </Card>
);

export default UserData;
