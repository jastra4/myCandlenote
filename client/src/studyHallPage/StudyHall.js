import React from 'react';
import { connect } from 'react-redux';
import ChatBox from './ChatBox';
import PrivateChatListConnected from './PrivateChatList';
import GroupsListConnected from './GroupsList';
import SearchConnected from './Search';
import VideoConference from './VideoConference';
import activeSocket from '../actions/activeSocket';

class StudyHall extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chat: 'No chat selected' };
  }

  changeChat(name) {
    this.setState({ chat: name });
  }

  render() {
    if (this.props.socket === undefined) {
      return (<div>No socket connection</div>);
    }
    return (
      <div className="studyContainer">
        <div className="groupsList studyBackground">
          <GroupsListConnected changeChat={this.changeChat.bind(this)} chat={this.state.chat}/>
        </div>
        <div className="friendsList studyBackground">
          <PrivateChatListConnected changeChat={this.changeChat.bind(this)} chat={this.state.chat}/>
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
  { socket: state.activeSocket.socket }
);

const mapDispatchToProps = dispatch => (
  { activeSocket: (socket, username) => dispatch(activeSocket(socket, username)) }
);

const StudyHallConnected = connect(mapStateToProps, mapDispatchToProps)(StudyHall);

export default StudyHallConnected;

// <VideoConference />
