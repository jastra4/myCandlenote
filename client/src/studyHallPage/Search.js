import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import $ from 'jquery';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/handleFriendRequest', {
      currentUser: this.props.username,
      newFriend: $('#search').val(),
    })
      .then((res) => {
        console.log(res.data);
      });
    $('#search').val('');
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input id="search" className="input" placeholder="find a user or group"></input>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  socket: state.activeSocket.socket,
  username: state.activeSocket.username,
});

const SearchConnected = connect(mapStateToProps)(Search);

export default SearchConnected;
