import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  handleClick() {
    // this.props.changeChat(this.props.group);
  }

  removeGroup() {
    console.log('removeGroup: ', this.props.group.groupname, ' for ', this.props.username);
    axios.post('/closeGroupChat', {
      username: this.props.username,
      groupname: this.props.group.groupname,
    })
      .then((res) => {
        console.log('closed group chat');
      });
  }

  render() {
    console.log(this.props.group.groupname);
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

const mapStateToProps = state => (
  {
    socket: state.activeSocket.socket,
    username: state.activeSocket.username,
  }
);

const GroupConnected = connect(mapStateToProps)(Group);

export default GroupConnected;

// export default Group;
