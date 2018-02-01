import React from 'react';
import axios from 'axios';
import $ from 'jquery';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const username = $('#search').val();
    axios.post('/friendrequest', { username })
      .then((res) => {
        console.log(res);
      });
    console.log(`searched: "${username}"`);
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

export default Search;
