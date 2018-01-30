import React from 'react';

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  handleClick = () => {
    this.props.changeChat(this.props.group);
  }

  render() {
    return (
      <div onClick={this.handleClick.bind(this)}>
        {this.props.group}
      </div>
    );
  }
}

export default Group;
