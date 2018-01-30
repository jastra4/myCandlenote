import React from 'react';
import ChatBoxConnected from './ChatBox';
import FriendsListConnected from './FriendsList';
import GroupsListConnected from './GroupsList';
import Search from './Search';

export default class StudyHall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
    <div className="studyContainer">
      <div className="Groups studyComp">
        <GroupsListConnected />
      </div>
      <div className="Friends studyComp">
        <FriendsListConnected socket={this.state.socket}/>
      </div>
      <div className="Search studyComp">
        <Search />
      </div>
      <div className="Chat studyComp">
        <ChatBoxConnected />
      </div>
    </div>
    );
  }
}
