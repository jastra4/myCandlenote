import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Group from './Group';

class GroupsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { groups: [
      { groupname: 'all-students' },
      { groupname: 'candlenote' },
      { groupname: 'random' },
    ] };
  }

  componentWillMount() {
    this.props.socket.removeAllListeners();
  }

  componentDidMount() {
    this.props.socket.on('opened group chat', (data) => {
      const testData = data.groupname;
      const testGroups = [];
      this.state.groups.forEach((group) => {
        const testGroup = group.groupname;
        testGroups.push(testGroup);
      });
      if (!testGroups.includes(testData)) {
        this.setState({ groups: this.state.groups.concat([data]) });
      }
    });

    this.props.socket.on('closed group chat', (data) => {
      let updatedGroups = [];
      this.state.groups.forEach((group, i) => {
        if (group.groupname === data) {
          this.state.groups.splice(i, 1);
          updatedGroups = this.state.groups;
        }
      });
      this.setState({ groups: updatedGroups });
    });
  }

  loadGroups() {
    return axios.get(`/loadGroupChats?currentUser=${this.props.username}`)
      .then((groups) => {
        const groupsList = groups.data;
        this.setState({ groups: groupsList });
      })
      .catch((err) => {
        console.log(err);
      });
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

const mapStateToProps = state => (
  { socket: state.activeSocket.socket }
);

const GroupsListConnected = connect(mapStateToProps)(GroupsList);

export default GroupsListConnected;

// export default GroupsList;
