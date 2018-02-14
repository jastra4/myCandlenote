import React from 'react';
import PrivateChatConnected from './PrivateChat';

class PrivateChatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className='chatListHeader ui segment scroll'>Private Chats</div>
        <div> {this.props.privateChats.map((chat, i) => (
          <PrivateChatConnected
            key={i}
            chat={this.props.channel}
            privateChat={chat}
            selectChat={this.props.selectChat}
            closeChat={this.props.closePrivateChat}
          />
        ))} </div>
      </div>
    );
  }
}

export default PrivateChatList;
