import React from 'react';
import { connect } from 'react-redux';

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick() {
    this.props.changeChat(this.props.groupChat.groupname, 'group', this.props.groupChat.members.length);
  }

  closeSelf() {
    this.props.closeChat(this.props.self, this.props.username, this.props.groupChat.groupname);
  }

  render() {
    return (
      <div className='group'>
        <span className='groupName' onClick={this.handleClick.bind(this)}>
          {this.props.groupChat.groupname}
        </span>
        <span onClick={this.closeSelf.bind(this)} className='groupRemove'>x</span>
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
