import React from 'react';
import GroupConnnected from './Group';

class GroupsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className='chatListHeader ui segment scroll'>Group Chats</div>
        <div>{this.props.groupChats.map((group, i) => (
          <GroupConnnected
            key={i}
            chat={this.props.channel}
            groupChat={group}
            selectChat={this.props.selectChat}
            closeChat={this.props.closeGroupChat}
            className='group'
          />
        ))}
        </div>
      </div>
    );
  }
}

export default GroupsList;
