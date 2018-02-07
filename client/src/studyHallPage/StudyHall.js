import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ChatBox from './ChatBox';
import PrivateChatListConnected from './PrivateChatList';
import GroupsListConnected from './GroupsList';
import SearchConnected from './Search';
import VideoConference from './VideoConference';
import activeSocket from '../actions/activeSocket';

class StudyHall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: 'No chat selected',
      privateChats: [],
      groupChats: [],
      type: 'none',
    };
    this.test = this.test.bind(this);
  }

  componentDidMount() {
    this.test();
  }

  test() {
    if (this.props.username !== undefined) {
      this.loadPrivateChats();
      this.loadGroupChats();
    } else {
      window.setTimeout(this.test, 250);
    }
  }

  loadPrivateChats() {
    return axios.get(`/loadPrivateChats?currentUser=${this.props.username}`)
      .then((chats) => {
        this.setState({ privateChats: chats.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  loadGroupChats() {
    return axios.get(`/loadGroupChats?currentUser=${this.props.username}`)
      .then((groups) => {
        const groupsList = groups.data;
        this.setState({ groupChats: groupsList });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updatePrivateChats(newChat) {
    console.log('updatePrivateChats: ', newChat);
    this.setState({ privateChats: this.state.privateChats.concat([newChat]) });
  }

  updateGroupChats(newChat) {
    console.log('updateGroupChats: ', newChat);
    this.setState({ groupChats: this.state.groupChats.concat([newChat]) });
  }

  changeChat(name, type) {
    this.setState({
      chat: name,
      type,
    });
  }

  closePrivateChat(i, username, otheruser) {
    const updated = this.state.privateChats;
    updated.splice(i, 1);
    this.setState({ privateChats: updated });

    if (otheruser === this.state.chat) {
      this.setState({
        chat: 'No chat selected',
        type: 'none',
      });
    }

    this.props.socket.emit('close private chat', {
      username,
      otheruser,
    });
  }

  closeGroupChat(i, username, chatname) {
    const updated = this.state.groupChats;
    updated.splice(i, 1);
    this.setState({ groupChats: updated });

    if (chatname === this.state.chat) {
      this.setState({
        chat: 'No chat selected',
        type: 'none',
      });
    }

    this.props.socket.emit('leave group chat', {
      username,
      groupname: chatname,
    });
  }

  render() {
    if (this.props.socket === undefined) {
      return (<div>No socket connection</div>);
    }
    return (
      <div className="studyContainer">
        <div className="groupsList studyBackground">
          <GroupsListConnected
            changeChat={this.changeChat.bind(this)}
            currentChat={this.state.chat}
            groupChats={this.state.groupChats}
            closeGroupChat={this.closeGroupChat.bind(this)}
          />
        </div>
        <div className="friendsList studyBackground">
          <PrivateChatListConnected
            changeChat={this.changeChat.bind(this)}
            currentChat={this.state.chat}
            privateChats={this.state.privateChats}
            closePrivateChat={this.closePrivateChat.bind(this)}
          />
        </div>
        <div className="Search studyBackground">
          <SearchConnected 
          updatePrivateChats={this.updatePrivateChats.bind(this)}
          updateGroupChats={this.updateGroupChats.bind(this)}
        />
        </div>
        <div className="Chat studyBackground">
          <ChatBox chat={this.state.chat} type={this.state.type}/>
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

const mapDispatchToProps = dispatch => (
  { activeSocket: (socket, username) => dispatch(activeSocket(socket, username)) }
);

const StudyHallConnected = connect(mapStateToProps, mapDispatchToProps)(StudyHall);

export default StudyHallConnected;

// <VideoConference />
