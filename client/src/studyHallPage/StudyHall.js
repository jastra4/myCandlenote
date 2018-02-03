import React from 'react';
import { connect } from 'react-redux';
import ChatBox from './ChatBox';
import FriendsListConnected from './FriendsList';
import GroupsList from './GroupsList';
import SearchConnected from './Search';
import VideoConference from './VideoConference';
import activeSocket from '../actions/activeSocket';

class StudyHall extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chat: '' };
  }

  changeChat(username) {
    this.setState({ chat: username });
  }

  render() {
    if (this.props.updatedSocket !== undefined) {
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
    return (<div>Loading...</div>);
  }
}

const mapStateToProps = state => (
  { updatedSocket: state.activeSocket.socket }
);

const mapDispatchToProps = dispatch => (
  { activeSocket: (socket, username) => dispatch(activeSocket(socket, username)) }
);

const StudyHallConnected = connect(mapStateToProps, mapDispatchToProps)(StudyHall);

export default StudyHallConnected;

// <VideoConference />
