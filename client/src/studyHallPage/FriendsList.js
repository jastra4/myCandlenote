import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import Friend from './Friend';

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: ['Alice'],
      socket: null,
    };

    props.socket.on('update users', (data) => {
      this.setState({ friends: this.state.friends.concat([data.data]) });
    });
  }

  render() {
    return (
      <div>
        <h4>Friends:</h4>
        <div id="users">{this.state.friends.map((friend, i) => (
          <Friend key={i} friend={friend} changeChat={this.props.changeChat}/>
        ))}
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => ({  });

// const FriendsListConnected = connect(mapStateToProps)(FriendsList);

export default FriendsList;
