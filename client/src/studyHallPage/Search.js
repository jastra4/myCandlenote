import React from 'react';
import $ from 'jquery';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(`searched: "${$('#search').val()}"`);
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
