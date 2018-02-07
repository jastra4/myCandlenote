import React from 'react';
import { connect } from 'react-redux';
import PrivateChatConnected from './PrivateChat';

class PrivateChatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className='friendsListHeader'>Private Chats</div>
        <div> {this.props.privateChats.map((chat, i) => (
          <PrivateChatConnected
            key={i}
            self={i}
            chat={this.props.currentChat}
            privateChat={chat}
            changeChat={this.props.changeChat}
            closeChat={this.props.closePrivateChat}
          />
        ))} </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    username: state.activeSocket.username,
    socket: state.activeSocket.socket,
  }
);

const PrivateChatListConnected = connect(mapStateToProps)(PrivateChatList);

export default PrivateChatListConnected;
