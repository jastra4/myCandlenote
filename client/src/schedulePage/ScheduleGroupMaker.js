import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import './schedulePage.css';

const ScheduleGroupMaker = props => (
  <Card raised className="user-friends-container">
    <Card.Content className="user-friends-content">
      <Card.Header as="h4" className="user-friends-header">
        <Icon name="users" /> Friends:
      </Card.Header>
    </Card.Content>
    <Card.Content className="user-friend-card-count">
      Friends:
      <ul>
        {props.friends.map(friend => (
          props.group.includes(friend.id) ?
            <li className="friend-selected" onClick={() => props.removeFriendFromGroup(friend.id)}>{friend.username}</li> :
            <li onClick={() => props.addFriendToGroup(friend.id)}>{friend.username}</li>
        ))}
      </ul>
    </Card.Content>
  </Card>
);

export default ScheduleGroupMaker;
