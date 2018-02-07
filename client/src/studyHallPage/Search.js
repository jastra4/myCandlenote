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
    const input = $('#search').val();
    if (input.substring(0, 3) === '/c ') {
      this.props.socket.emit('create group chat', {
        username: this.props.username,
        groupname: input.substring(3, input.length),
      });
    } else if (input.substring(0, 3) === '/j ') {
      this.props.socket.emit('join group chat', {
        username: this.props.username,
        groupname: input.substring(3, input.length),
      });
    } else {
      this.props.socket.emit('open private chat', {
        username: this.props.username,
        otheruser: input,
      });
    }
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
