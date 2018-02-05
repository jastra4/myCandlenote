import React from 'react';
import Group from './Group';

class GroupsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { groups: ['all-students', 'candlenote', 'random'] };
  }

  render() {
    return (
      <div>
        <div className='groupsListHeader'>Group Chats</div>
        <div>{this.state.groups.map((group, i) => (
          <Group key={i} group={group} changeChat={this.props.changeChat} className='group'/>
        ))}
        </div>
      </div>
    );
  }
}

export default GroupsList;
