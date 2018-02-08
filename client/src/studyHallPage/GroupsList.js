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
        <div className='groupsListHeader'>Group Chats</div>
        <div>{this.props.groupChats.map((group, i) => (
          <GroupConnnected
            key={i}
            self={i}
            chat={this.props.currentChat}
            groupChat={group}
            changeChat={this.props.changeChat}
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
