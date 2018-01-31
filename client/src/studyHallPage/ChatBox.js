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
      socket: null,
      messages: [],
    };

    props.socket.on('new message', (data) => {
      console.log('socket received new message');
      this.setState({ messages: this.state.messages.concat([data]) });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const msg = {
      text: $('#message').val(),
      to: this.props.chat,
      sentBy: this.props.username.data,
    };
    this.props.socket.emit('send message', msg);
    $('#message').val('');
  }

  componentWillReceiveProps(newProps) {
    console.log('ChatBox received new props: ', newProps);
    if (newProps.messages.length !== this.state.messages.length) {
      this.setState({ messages: newProps.messages });
    }
    if (newProps.chat !== this.props.chat) {
      this.loadMessages();
    }
  }

  componentDidMount() {
    this.loadMessages();
  }

  loadMessages() {
    return axios.get('/messages')
      .then((messages) => {
        const messageInfo = messages.data;
        this.props.loadMessages(messageInfo);
        console.log('loaded messages');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onClick() {
    console.log('props: ', this.props.messages);
    console.log('state: ', this.state.messages);
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
        <button onClick={this.onClick.bind(this)}> test </button>
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
  return { messages: messagesForChat };
};

const ChatBoxConnected = connect(mapStateToProps, mapDispatchToProps)(ChatBox);

export default ChatBoxConnected;
