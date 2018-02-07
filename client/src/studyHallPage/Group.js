import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentWillUnmount() {
    if (this.props.chat === this.props.group.groupname) {
      this.props.changeChat('No chat selected');
    }
  }

  handleClick() {
    this.props.changeChat(this.props.group.groupname, 'group');
  }

  removeGroup() {
    this.props.socket.emit('leave group chat', {
      username: this.props.username,
      groupname: this.props.group.groupname,
    });
  }

  render() {
    console.log(this.props.group.groupname);
    return (
      <div>
        <span className='groupName' onClick={this.handleClick.bind(this)}>
          {this.props.group.groupname}
        </span>
        <span onClick={this.removeGroup.bind(this)} className='groupRemove'>x</span>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    socket: state.activeSocket.socket,
    username: state.activeSocket.username,
  }
);

const GroupConnected = connect(mapStateToProps)(Group);

export default GroupConnected;

// export default Group;
