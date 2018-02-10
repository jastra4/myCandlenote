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
        <div className='friendsListHeader ui segment scroll'>Private Chats</div>
        <div> {this.props.privateChats.map((chat, i) => (
          <PrivateChatConnected
            key={i}
            self={i}
            chat={this.props.channel}
            privateChat={chat}
            changeChat={this.props.changeChat}
            closeChat={this.props.closePrivateChat}
          />
        ))} </div>
      </div>
    );
  }
}

export default PrivateChatList;
