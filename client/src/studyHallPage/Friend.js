import React from 'react';

class Friend extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  handleClick = () => {
    this.props.changeChat(this.props.friend);
  }

  render() {
    return (
      <div onClick={this.handleClick.bind(this)}>
        {this.props.friend}
      </div>
    );
  }
}

export default Friend;
