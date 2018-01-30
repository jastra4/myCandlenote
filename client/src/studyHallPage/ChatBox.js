import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import io from 'socket.io-client';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Message from './Message';
import Friend from './Friend';

const socketUrl = 'http://localhost:3000';

class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      messages: [],
      users: [],
      chat: '',
    };
  }

  currentChat(forum) {
    this.setState({ chat: forum });
  }

  componentWillReceiveProps(nextProps) {
    console.log(`authenticated? ${this.props}`);
    if (nextProps.isAuth) {
      this.initSocket(nextProps.userId);
    } else {
      console.log('Did not create connection');
    }
  }

  initSocket(userId) {
    const socket = io(socketUrl);
    socket.on('connect', () => {
      console.log('Connected!');
      this.setState({ socket });
      return axios.get(`/username?id=${userId}`)
        .then((username) => {
          this.setState({ userId });
          socket.emit('new user', username);
        })
        .catch((error) => {
          console.log(error);
        });
    });

    // socket.on('update users', (data) => {
    //   console.log('new user: ', data.data);
    //   this.setState({ users: this.state.users.concat([data.data]) });
    // });

    socket.on('new message', (data) => {
      this.setState({ messages: this.state.messages.concat([data]) });
    });
  }

  sendMessage(e) {
    e.preventDefault();
    this.state.socket.emit('send message', $('#message').val());
    $('#message').val('');
  }

  render() {
    return (
      <div>
        This is a chat component!
        <div id="contentWrap">
          <div id="chatWrap"> {this.state.messages.map((message, i) => (
            <Message key={i} message={message} />
          ))}
            <div id="chat"></div>
            <form id="send-messege">
              <input size="35" id="message"></input>
              <input type="submit" onClick={this.sendMessage.bind(this)}></input>
            </form>
            </div>
          <div id="users">{this.state.users.map((username, i) => (
            <Friend key={i} username={username} />
          ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    isAuth: state.isAuth.isAuth,
    userId: state.userId.userId,
  }
);

const ChatBoxConnected = connect(mapStateToProps)(ChatBox);

export default ChatBoxConnected;

// a friend or group is clicked
// chat state is reset
// sends get request for chat history
// ChatBox re-renders to display results
