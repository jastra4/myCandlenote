import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ChatBox from './ChatBox';
import PrivateChatList from './PrivateChatList';
import GroupsList from './GroupsList';
import SearchConnected from './Search';
import VideoConference from './VideoConference';
import activeSocket from '../actions/activeSocket';

class StudyHall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: 'No chat selected',
      privateChats: [],
      groupChats: [],
      type: 'none', // chatType
      members: '', // chatMembers
    };
    this.loadChatLists = this.loadChatLists.bind(this);
  }

  componentDidMount() {
    this.loadChatLists();
  }

  loadChatLists() {
    if (this.props.username === undefined) {
      window.setTimeout(this.loadChatLists, 250);
    } else {
      this.loadPrivateChats();
      this.loadGroupChats();
    }
  }

  loadPrivateChats() {
    return axios.get(`/loadPrivateChats?currentUser=${this.props.username}`)
      .then((chats) => {
        this.setState({ privateChats: chats.data });
      })
      .catch((err) => {
        console.log('loadPrivateChats: ', err);
      });
  }

  loadGroupChats() {
    return axios.get(`/loadGroupChats?currentUser=${this.props.username}`)
      .then((groups) => {
        this.setState({ groupChats: groups.data });
      })
      .catch((err) => {
        console.log('loadGroupChats: ', err);
      });
  }

  updatePrivateChats(newChat) {
    this.setState({ privateChats: this.state.privateChats.concat([newChat]) });
  }

  updateGroupChats(newChat) {
    this.setState({ groupChats: this.state.groupChats.concat([newChat]) });
  }

  changeChat(name, type, members) {
    this.setState({
      channel: name,
      type,
      members,
    });
  }

  closePrivateChat(i, username, otheruser) {
    const updated = this.state.privateChats;
    updated.splice(i, 1);
    this.setState({ privateChats: updated });

    if (otheruser === this.state.channel) {
      this.setState({
        channel: 'No chat selected',
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

    if (chatname === this.state.channel) {
      this.setState({
        channel: 'No chat selected',
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
      <div className="studyHallContainer ui segment">
        <div className="chatList ui segment">
          <GroupsList
            changeChat={this.changeChat.bind(this)}
            channel={this.state.channel}
            groupChats={this.state.groupChats}
            closeGroupChat={this.closeGroupChat.bind(this)}
          />
        </div>
        <div className="chatList ui segment">
          <PrivateChatList
            changeChat={this.changeChat.bind(this)}
            channel={this.state.channel}
            privateChats={this.state.privateChats}
            closePrivateChat={this.closePrivateChat.bind(this)}
          />
        </div>
        <div className="searchContainer ui form">
          <SearchConnected
          updatePrivateChats={this.updatePrivateChats.bind(this)}
          updateGroupChats={this.updateGroupChats.bind(this)}
        />
        </div>
        <div className="chatBoxContainer ui segment">
          <ChatBox
            chat={this.state.channel}
            type={this.state.type}
            members={this.state.members}
          />
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

//   <VideoConference />
