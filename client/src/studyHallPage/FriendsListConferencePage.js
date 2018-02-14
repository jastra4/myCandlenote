import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';

const UserFriendsList = props => (
  <Card raised className="user-friends-container">
    <Card.Content className="user-friends-content">
      <Card.Header as="h4" className="user-friends-header">
        <Icon name="users" /> Friends:
      </Card.Header>
    </Card.Content>
    <Card.Content className="user-friend-card-count">
      <ul>
        {props.friends.map(friend => (
          <li>
            <MediaQuery minWidth={1000}>
              <Image src={friend.profileImage} size="mini" circular spaced="right" />
            </MediaQuery>
            {friend.username} {console.log('Friend:', friend)}<Icon name="send" onClick={() => props.handleVideoConferenceInviteClick(friend.username)}/>
          </li>
        ))}
      </ul>
    </Card.Content>
  </Card>
);
export default UserFriendsList;
