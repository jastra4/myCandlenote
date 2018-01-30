import React from 'react';
import io from 'socket.io-client';
import $ from 'jquery';
import axios from 'axios';
import { connect } from 'react-redux'; // auth stuff
import Message from './Message';

const socketUrl = 'http://localhost:3000';
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      messages: [],
      socket: null,
    };
  }

  componentWillReceiveProps() { // auth stuff
    console.log('authenticated? ', this.props);
    if (this.props.isAuth) {
      this.initSocket(this.props.userId);
    } else {
      console.log('Not authenticated. Did not create connection.');
    }
  }

  initSocket(userId) {
    const socket = io(socketUrl);
    socket.on('connect', () => {
      console.log('Connected!');
      this.setState({ socket });
      return axios.get(`/username?id=${userId}`) //`/entry?id=${entryid}`
        .then((username) => {
          this.setState({ userId });
          console.log('USRNAME: ', username);
          socket.emit('new user', this.state.userId);
        })
        .catch((error) => {
          console.log(error);
        });
    });

    socket.on('new message', (data) => {
      this.setState({ messages: this.state.messages.concat([data]) });
    });
  }

  sendMessage(e) {
    e.preventDefault();
    this.state.socket.emit('send message', $('#message').val());
    $('#message').val('');
  }

  render = () =>
    (
      <div>
        This is a chat component
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
          <div id="users"></div>
        </div>
      </div>
    );
}

const mapStateToProps = state => (
  {
    isAuth: state.isAuth.isAuth,
    userId: state.userId.userId,
  }
);

const ChatConnected = connect(mapStateToProps)(Chat);

export default ChatConnected;
