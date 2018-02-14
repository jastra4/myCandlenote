import React from 'react';
import { connect } from 'react-redux';

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: false };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.chat === this.props.groupChat.groupname) {
      this.setState({ selected: true });
    } else {
      this.setState({ selected: false });
    }
  }

  select() {
    const { groupname, members } = this.props.groupChat;
    this.props.selectChat(groupname, 'group', members);
  }

  close() {
    this.props.closeChat(this.props.username, this.props.groupChat.groupname, 'group');
  }

  render() {
    return (
      <div className={`chatContainer chatSelected${this.state.selected}`}>
        <span className='chatName' onClick={this.select.bind(this)}>
          {this.props.groupChat.groupname}
        </span>
        <span onClick={this.close.bind(this)} className='closeChat'>x</span>
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
