import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import FriendConnected from './Friend';

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { friends: [] };
  }

  componentWillMount() {
    this.props.socket.removeAllListeners();
  }

  componentDidMount() {
    this.props.socket.on('update friends', (data) => {
      this.setState({ friends: this.state.friends.concat([data]) });
    });
    this.props.socket.on('removed friend', (data) => {
      let updatedfriends = [];
      this.state.friends.forEach((friend, i) => {
        if (friend.username === data) {
          this.state.friends.splice(i, 1);
          updatedfriends = this.state.friends;
        }
      });
      this.setState({ friends: updatedfriends });
    });

    this.props.socket.emit('available');
    this.loadFriends();
  }

  loadFriends() {
    return axios.get(`/loadFriendsList?currentUser=${this.props.username}`)
      .then((friends) => {
        console.log('axios friends: ', friends);
        const friendsList = friends.data;
        this.setState({ friends: friendsList });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    this.props.socket.emit('away');
  }

  render() {
    console.log('friends: ', this.state.friends);
    return (
      <div>
        <div className='friendsListHeader'>Privat Chats</div>
        <div> {this.state.friends.map((friend, i) => (
          <FriendConnected key={i} friend={friend} changeChat={this.props.changeChat}/>
        ))} </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.activeSocket.username,
    socket: state.activeSocket.socket,
  };
};

const FriendsListConnected = connect(mapStateToProps)(FriendsList);

export default FriendsListConnected;
