import React from 'react';

class Friend extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  handleClick = () => {
    this.props.changeChat(this.props.friend.username);
  }

  render() {
    return (
      <div onClick={this.handleClick.bind(this)}>
        {this.props.friend.username}
      </div>
    );
  }
}

export default Friend;
