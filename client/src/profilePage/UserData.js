import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

const UserData = props => (
  <div className="user-data-container">
    {console.log('PROPS IN USER DATA:', props)}
    <Card raised>
      <Card.Content>
      </Card.Content>
      <Card.Content>
        <Card.Header as="h4">
          <Icon name="vcard outline" />
          Flashcard Count:
        </Card.Header>
        <Card.Meta>
          {props.flashcardCount || '<flashcard count>'}
        </Card.Meta>
        <Card.Header as="h4">
          <Icon name="clone" />
          Deck Count:
        </Card.Header>
        <Card.Meta>
          {props.deckCount || '<deck count>'}
        </Card.Meta>
      </Card.Content>
    </Card>
  </div>
);

export default UserData;
