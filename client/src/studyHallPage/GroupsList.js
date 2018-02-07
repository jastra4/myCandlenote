import React from 'react';
import { connect } from 'react-redux';
import GroupConnnected from './Group';

class GroupsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { groups: [] };
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
          />
        ))}
        </div>
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

const GroupsListConnected = connect(mapStateToProps)(GroupsList);

export default GroupsListConnected;
