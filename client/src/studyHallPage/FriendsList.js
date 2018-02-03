import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import FriendConnected from './Friend';
import { setUsers } from '../actions/usersActions';

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { friends: [] };
    this.updateFriends = this.updateFriends.bind(this);
    // this.props.socket.on('update friends', (data) => {
    //   console.log('Added ', data);
    // });
  }

  componentWillMount() {
    this.props.socket.removeAllListeners();
    this.props.socket.on('update friends', (data) => {
      this.updateFriends(data);
      console.log('Added ', data);
    });
  }

  updateFriends(data) {
    console.log('updateFriends ran');
    this.state.friends = this.state.friends.concat([data]);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.friends !== undefined && nextProps.friends !== null) {
      const users = Object.keys(nextProps.friends).map(key => nextProps.friends[key]);
      this.setState({ friends: users });
    }
  }

  componentDidMount() {
    this.props.socket.emit('available');
    this.getUsers();
  }

  componentWillUnmount() {
    this.props.socket.emit('away');
  }

  getUsers() {
    return axios.get(`/loadFriendsList?currentUser=${this.props.username}`)
      .then((friends) => {
        const friendsList = friends.data;
        this.props.setFriends(friendsList);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h4>Friends</h4>
        <div> {this.state.friends.map((friend, i) => (
          <FriendConnected key={i} friend={friend} changeChat={this.props.changeChat}/>
        ))} </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => (
  { setFriends: friendsList => dispatch(setUsers(friendsList)) }
);

const mapStateToProps = (state) => {
  const usersById = state.users.byId;
  return {
    friends: usersById,
    username: state.activeSocket.username,
    socket: state.activeSocket.socket, // new
  };
};

const FriendsListConnected = connect(mapStateToProps, mapDispatchToProps)(FriendsList);

export default FriendsListConnected;
