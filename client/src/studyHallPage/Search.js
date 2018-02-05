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
    axios.post('/openChat', {
      currentUser: this.props.username,
      newChat: $('#search').val(),
    })
      .then((res) => {
        this.props.socket.emit('new friend', res.data, this.props.username);
      });
    $('#search').val('');
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
