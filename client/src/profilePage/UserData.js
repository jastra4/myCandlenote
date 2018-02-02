import React from 'react';
import { Card } from 'semantic-ui-react';

const UserData = (props) => {
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  let dateJoined;
  if (props.dateJoined) {
    dateJoined = new Date(props.dateJoined).toLocaleDateString('en-US', dateOptions);
  } else {
    dateJoined = '';
  }
  return (
    <div className="user-data-container">
      <Card raised>
        <Card.Content>
          <Card.Header as="h2">
            Personal Stats:
          </Card.Header>
          <Card.Meta>
            <span>
              {dateJoined || '<date joined>'}
            </span>
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
};

export default UserData;
