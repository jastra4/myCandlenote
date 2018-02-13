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
    // display my messages
    this.props.socket.on('submitted message', (data) => {
      this.setState({ messages: this.state.messages.concat([data]) });
    });
    // display others messages
    this.props.socket.on(`submitted message ${this.state.chat}`, (data) => {
      axios.post('/readReciept', { msg: data });
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
        this.props.loadMessages(messageInfo);
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
      readReciept: false,
      timeStamp: null,
    };
    this.props.socket.emit('submit message', msg);
    $('#message').val('');
  }

  componentWillUnmount() {
    this.props.socket.emit('away', { username: this.props.username });
  }

  render() {
    return (
      <div>
        <div className="chatHeader">
          {this.props.chat}
          <div className={`${this.state.type}HeaderType`}>
            <i className="groupChatMembers users icon"></i>
            {this.props.members.length}
          </div>
        </div>
        <div className="chatMessages scroll" id="chatBox">
          {this.state.messages.map((message, i) => (
            <Message key={i} message={message} username={this.props.username}/>
          ))}
        </div>
        <div className="chatInput ui form">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input id="message" className="input field" placeholder="type a message" autoComplete="off"></input>
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
