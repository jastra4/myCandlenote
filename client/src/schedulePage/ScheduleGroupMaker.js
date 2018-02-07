import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

const ScheduleGroupMaker = props => (
  <Card raised className="user-friends-container">
    <Card.Content className="user-friends-content">
      <Card.Header as="h4" className="user-friends-header">
        <Icon name="users" /> Friends:
      </Card.Header>
    </Card.Content>
    <Card.Content className="user-friend-card-count">
      {'<list of friends>'}
      <ul>
        {props.friends.map(friend => (
          <li>{friend.username}</li>
        ))}
      </ul>
    </Card.Content>
  </Card>
);

export default ScheduleGroupMaker;
