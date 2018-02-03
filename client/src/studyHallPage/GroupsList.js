import React from 'react';
import Group from './Group';

class GroupsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { groups: ['math', 'english', 'science'] };
  }

  render() {
    return (
      <div>
        <h3 className='groupsListHeader'>Groups:</h3>
        <div>{this.state.groups.map((group, i) => (
          <Group key={i} group={group} changeChat={this.props.changeChat}/>
        ))}
        </div>
      </div>
    );
  }
}

export default GroupsList;
