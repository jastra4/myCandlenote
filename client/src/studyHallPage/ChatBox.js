import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import Message from './Message';
import { setMessages } from '../actions/messagesActions';

class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };

    if (props.socket !== undefined) {
      props.socket.on('new message', (data) => {
        this.setState({ messages: this.state.messages.concat([data]) });
      });      
    }
  }

 //
  componentDidMount() {
    if (this.props.socket === false) {
      this.identifyUser();
    }
  }

  identifyUser() {
    axios.get('/api/userid')
      .then((res) => {
        if (res.data.userid !== undefined) {
          this.initSocket(res.data.userid);
        } else {
          console.log('Not logged in');
        }
      });
  }

  initSocket(userid) {
    const socketUrl = 'http://localhost:3000';
    const socket = io(socketUrl);
    socket.on('connect', () => {
      this.nameSocket(socket, userid);
    });
  }

  nameSocket = (socket, userid) => {
    axios.get(`/username?id=${userid}`)
      .then((res) => {
        socket.emit('new user', res.data);
        this.props.activeSocket(socket, res.data);
        console.log(`${res.data} connected!`);
      });
  }
  //


  handleSubmit(e) {
    e.preventDefault();
    const msg = {
      text: $('#message').val(),
      to: this.props.chat,
      sentBy: this.props.username,
    };
    this.props.socket.emit('send message', msg);
    $('#message').val('');
  }

  componentWillReceiveProps(newProps) {
    if (newProps.messages.length !== this.state.messages.length) {
      this.setState({ messages: newProps.messages });
    }
    if (newProps.chat !== this.props.chat) {
      this.getMessages(newProps.chat);
    }
  }

  getMessages(to) {
    return axios.get(`/messages?from=${this.props.username}&&to=${to}`) // `/username?id=${this.props.username}`
      .then((messages) => {
        const messageInfo = messages.data;
        this.props.loadMessages(messageInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div className="chatHeader">
          <h4>{this.props.chat}</h4>
        </div>
        <div className="chatMessages">
          {this.state.messages.map((message, i) => (
            <Message key={i} message={message}/>
          ))}
        </div>
        <div className="chatInput">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input id="message" className="input" placeholder="type a message"></input>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => (
  { loadMessages: messageInfo => dispatch(setMessages(messageInfo)) }
);

const mapStateToProps = (state) => {
  const messagesById = state.messages.byId;
  const messagesForChat = Object.keys(messagesById).map(key => messagesById[key]);
  return {
    messages: messagesForChat,
    socket: state.activeSocket.socket,
    username: state.activeSocket.username,
  };
};

const ChatBoxConnected = connect(mapStateToProps, mapDispatchToProps)(ChatBox);

export default ChatBoxConnected;
