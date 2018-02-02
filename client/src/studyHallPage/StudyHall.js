import React from 'react';
import { connect } from 'react-redux';
import ChatBox from './ChatBox';
import FriendsListConnected from './FriendsList';
import GroupsList from './GroupsList';
import SearchConnected from './Search';
import VideoConference from './VideoConference';

class StudyHall extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chat: '' };
  }

  changeChat(username) {
    this.setState({ chat: username });
  }

  render() {
    return (
      <div className="studyContainer">
        <div className="Groups studyBackground">
          <GroupsList changeChat={this.changeChat.bind(this)}/>
        </div>
        <div className="Friends studyBackground">
          <FriendsListConnected changeChat={this.changeChat.bind(this)}/>
        </div>
        <div className="Search studyBackground">
          <SearchConnected />
        </div>
        <div className="Chat studyBackground">
          <ChatBox chat={this.state.chat}/>
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = state => (
  { activeSocket: state.activeSocket.socket }
);

const StudyHallConnected = connect(mapStateToProps)(StudyHall);

export default StudyHallConnected;

// <VideoConference />
