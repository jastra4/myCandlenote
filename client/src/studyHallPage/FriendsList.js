import React from 'react';
import { connect } from 'react-redux';
import Friend from './Friend';

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: ['test1', 'test2', 'test3'],
    };

    this.props.socket.on('update users', (data) => {
      console.log('new user: ', data.data);
      this.setState({ friends: this.state.friends.concat([data.data]) });
    });
  }

  render() {
    return (
      <div>
        This is the FriendsList!
        <div id="users">{this.state.friends.map((friend, i) => (
          <Friend key={i} friend={friend} />
        ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({  });

const FriendsListConnected = connect(mapStateToProps)(FriendsList);

export default FriendsListConnected;
