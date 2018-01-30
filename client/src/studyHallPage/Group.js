import React from 'react';

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  handleClick() {
    // send request to server to query db for chat history
    // re-render chat with returned data
  }

  render() {
    return (
      <div onClick={this.handleClick.bind(this)}>
        This is a group
      </div>
    );
  }
}

export default Group;