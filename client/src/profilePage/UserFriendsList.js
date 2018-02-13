import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

const UserFriendsList = props => (
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
          <li onClick={() => props.handleVideoConferenceInviteClick(friend.username)}><Image src={friend.profileImage} size="mini" circular spaced="right" />{friend.username} {console.log('Friend:', friend)}<Icon name="remove" onClick={() => props.handleRemoveFriend(friend.id)}/></li>
        ))}
      </ul>
    </Card.Content>
  </Card>
);

export default UserFriendsList;
