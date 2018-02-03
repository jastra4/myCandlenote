import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import FriendConnected from './Friend';
import { setUsers } from '../actions/usersActions';

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { friends: [] };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.friends !== undefined && nextProps.friends !== null) {
      const users = Object.keys(nextProps.friends).map(key => nextProps.friends[key]);
      this.setState({ friends: users });
    }
  }

  componentDidMount() {
    this.getUsers();
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
  };
};

const FriendsListConnected = connect(mapStateToProps, mapDispatchToProps)(FriendsList);

export default FriendsListConnected;
