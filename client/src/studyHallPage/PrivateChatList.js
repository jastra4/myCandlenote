import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PrivateChatConnected from './PrivateChat';

class PrivateChatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { privateChats: [] };
  }

  componentWillMount() {
    this.props.socket.removeAllListeners();
  }

  componentDidMount() {
    this.props.socket.on('opened private chat', (data) => {
      console.log('opened private chat: ', data);
      this.setState({ privateChats: this.state.privateChats.concat([data]) });
    });

    this.props.socket.on('closed private chat', (data) => {
      let updatedChats = [];
      this.state.privateChats.forEach((chat, i) => {
        if (chat.username === data) {
          this.state.privateChats.splice(i, 1);
          updatedChats = this.state.privateChats;
        }
      });
      this.setState({ privateChats: updatedChats });
    });

    this.loadPrivateChats();
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

  render() {
    return (
      <div>
        <div className='friendsListHeader'>Private Chats</div>
        <div> {this.state.privateChats.map((chat, i) => (
          <PrivateChatConnected
            key={i}
            privateChat={chat}
            changeChat={this.props.changeChat}
            chat={this.props.chat}
          />
        ))} </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    username: state.activeSocket.username,
    socket: state.activeSocket.socket,
  }
);

const PrivateChatListConnected = connect(mapStateToProps)(PrivateChatList);

export default PrivateChatListConnected;
