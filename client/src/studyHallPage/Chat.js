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
      username: null,
    };
  }

  componentWillReceiveProps() { // auth stuff
    console.log('authenticated? ', this.props.isAuth.isAuth);
    if (this.props.isAuth.isAuth) {
      this.initSocket();
    } else {
      console.log('Not authenticated. Did not create connection.');
    }
  }

  initSocket() {
    const socket = io(socketUrl);
    socket.on('connect', () => {
      console.log('Connected!');
      this.setState({ socket });
      return axios.get('/username')
        .then((username) => {
          this.setState({ username });
          socket.emit('new user', this.state.username);
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
    isAuth: state.isAuth,
    username: state.username,
  }
);

const ChatConnected = connect(mapStateToProps)(Chat);

export default ChatConnected;
