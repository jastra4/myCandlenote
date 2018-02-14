import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ChatBox from './ChatBox';
import PrivateChatList from './PrivateChatList';
import GroupsList from './GroupsList';
import SearchConnected from './Search';
import activeSocket from '../actions/activeSocket';

class StudyHall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: 'No chat selected',
      privateChats: [],
      groupChats: [],
      type: 'none',
      members: '',
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
      });
  }

  loadGroupChats() {
    return axios.get(`/loadGroupChats?currentUser=${this.props.username}`)
      .then((groups) => {
        this.setState({ groupChats: groups.data });
      });
  }

  addPrivateChat(newChat) {
    this.setState({ privateChats: this.state.privateChats.concat([newChat]) });
  }

  addGroupChat(newChat) {
    this.setState({ groupChats: this.state.groupChats.concat([newChat]) });
  }

  selectChat(name, type, members) {
    this.setState({
      channel: name,
      type,
      members,
    });
  }

  closeChat(username, chatname, chatType) {
    if (chatname === this.state.channel) {
      this.setState({
        channel: 'No chat selected',
        type: 'none',
      });
    }

    axios.post('/closeChat', {
      username,
      chatname,
      chatType,
    }).then((res) => {
      if (res.data) {
        this.loadChatLists();
      }
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
            selectChat={this.selectChat.bind(this)}
            channel={this.state.channel}
            groupChats={this.state.groupChats}
            closeGroupChat={this.closeChat.bind(this)}
          />
        </div>
        <div className="chatList ui segment">
          <PrivateChatList
            selectChat={this.selectChat.bind(this)}
            channel={this.state.channel}
            privateChats={this.state.privateChats}
            closePrivateChat={this.closeChat.bind(this)}
          />
        </div>
        <div className="searchContainer ui form">
          <SearchConnected
          addPrivateChat={this.addPrivateChat.bind(this)}
          addGroupChat={this.addGroupChat.bind(this)}
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
