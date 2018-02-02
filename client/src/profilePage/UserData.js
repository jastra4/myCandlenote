import React from 'react';
import { Card } from 'semantic-ui-react';

export default props => (
  <div className="user-data-container">
    <Card raised>
      <Card.Content>
        <Card.Header as="h2">
          Personal Stats:
        </Card.Header>
        <Card.Meta>
          {props.dateJoined || '<date joined>'}
        </Card.Meta>
      </Card.Content>
      <Card.Content>
        <Card.Header as="h4">
          Flashcard Count:
        </Card.Header>
        <Card.Meta>
          {props.flashcardCount || '<flashcard count>'}
        </Card.Meta>
        <Card.Header as="h4">
          Deck Count:
        </Card.Header>
        <Card.Meta>
          {props.deckCount || '<deck count>'}
        </Card.Meta>
      </Card.Content>
    </Card>
  </div>
);

