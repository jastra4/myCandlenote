import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import { connect } from 'react-redux';
import Message from './Message';
import { setMessages } from '../actions/messagesActions';

class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      chat: '',
      type: '',
    };
  }

  componentWillUpdate() {
    this.props.socket.removeAllListeners();
  }

  componentDidMount() {
    this.props.socket.emit('available', { username: this.props.username });
  }

  componentDidUpdate = () => {
    const chatbox = document.getElementById('chatBox');
    chatbox.scrollTop = chatbox.scrollHeight - chatbox.clientHeight;

    this.props.socket.emit('available', { username: this.props.username });
    // display mine
    this.props.socket.on('submitted message', (data) => {
      this.setState({ messages: this.state.messages.concat([data]) });
    });
    // display others
    this.props.socket.on(`submitted message ${this.state.chat}`, (data) => {
      this.setState({ messages: this.state.messages.concat([data]) });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.messages.length !== this.state.messages.length) {
      this.setState({ messages: nextProps.messages });
    }
    if (nextProps.chat !== this.props.chat) {
      this.setState({
        chat: nextProps.chat,
        type: nextProps.type,
      });
      this.getMessages(nextProps.chat, nextProps.type);
    }
  }

  getMessages(sentTo, type) {
    return axios.get(`/loadChatHistory?sentBy=${this.props.username}&&sentTo=${sentTo}&&type=${type}`) // `/username?id=${this.props.username}`
      .then((messages) => {
        const messageInfo = messages.data;
        console.log('messages: ', messages);
        this.props.loadMessages(messageInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const input = $('#message').val();
    const msg = {
      text: input,
      to: this.props.chat,
      sentBy: this.props.username,
      type: this.state.type,
      timeStamp: null,
    };
    this.props.socket.emit('submit message', msg);
    $('#message').val('');
  }

  componentWillUnmount() {
    this.props.socket.emit(`${this.props.username} away`, { username: this.props.username });
  }

  // deleteUser(e) {
  //   e.preventDefault();
  //   let input = $('#message').val();
  //   axios.post('/deleteUser', { username: input })
  //     .then((res) => {
  //       console.log(res);
  //     });
  // }

  render() {
    return (
      <div>
        <div className="chatHeader">
          <div>{this.props.chat}</div>
        </div>
        <div className="chatMessages scroll" id="chatBox">
          {this.state.messages.map((message, i) => (
            <Message key={i} message={message}/>
          ))}
        </div>
        <div className="chatInput">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input id="message" className="input" placeholder="type a message" autoComplete="off"></input>
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
