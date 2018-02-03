import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import $ from 'jquery';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit(e) {
    e.preventDefault();
    const curFriends = Object.keys(this.props.friends).map(key => this.props.friends[key]);
    console.log(curFriends);
    let alreadyFriends = false;
    curFriends.forEach((friend) => {
      if (friend.username === $('#search').val()) {
        alreadyFriends = true;
      }
    });
    if (alreadyFriends) {
      console.log('You are already friends');
    } else {
      axios.post('/handleFriendRequest', {
        currentUser: this.props.username,
        newFriend: $('#search').val(),
      })
        .then((res) => {
          // add to friends list via socket
          this.props.socket.emit('new friend', res.data, this.props.username);
          console.log('request sent to ', res.data);
        });
      $('#search').val('');
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input id="search" className="input" placeholder="find a user or group"></input>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const usersById = state.users.byId;
  return {
    socket: state.activeSocket.socket,
    username: state.activeSocket.username,
    friends: usersById,
  };
};

const SearchConnected = connect(mapStateToProps)(Search);

export default SearchConnected;
