import React from 'react';
import axios from 'axios';

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  handleClick() {
    this.props.changeChat(this.props.group);
  }

  removeGroup = () => {
    axios.post('/closeGroupChat', {
      username: this.props.username,
      groupname: this.props.group.groupname,
    })
      .then((res) => {
        console.log('closed group chat');
      });
  }

  render() {
    return (
      <div>
        <div className='groupName' onClick={this.handleClick.bind(this)}>
          {this.props.group.groupname}
          <div onClick={this.removeGroup.bind(this)} className='groupRemove'>x</div>
        </div>
      </div>
    );
  }
}

export default Group;
