import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import { connect } from 'react-redux'; // redux
import Message from './Message';
import { setMessages } from '../actions/messagesActions'; // redux

class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      messages: ['hello world'],
    };

    props.socket.on('new message', (data) => {
      console.log('new message received')
      const msg = `to ${data.to}: ${data.text}`;
      this.setState({ messages: this.props.messages.concat([data]) });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const msg = {
      text: $('#message').val(),
      to: this.props.chat,
    };
    this.props.socket.emit('send message', msg);
    $('#message').val('');
  }
 
  componentWillReceiveProps(newProps) {
    console.log('newProps: ', newProps);
    if (newProps.messages.length !== this.state.messages.length) {
      this.setState({ messages: newProps.messages });
    }
  }

  componentDidMount() {
    return axios.get('/messages')
      .then((messages) => {
        const messageInfo = messages.data;
        this.props.loadMessages(messageInfo);
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
            <Message key={i} message={message.text}/>
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

// redux
const mapDispatchToProps = dispatch => (
  { loadMessages: messageInfo => dispatch(setMessages(messageInfo)) }
);

// export default ChatBox;

// redux
const mapStateToProps = state => {
  // { messages: state.messages.byId }
  const messagesById = state.messages.byId;
  const messagesForChat = Object.keys(messagesById).map(key => messagesById[key]);
  console.log('MESSAGES: ', messagesForChat);
  return {
    messages: messagesForChat
  };
};

// redux
const ChatBoxConnected = connect(mapStateToProps, mapDispatchToProps)(ChatBox);
// redux
export default ChatBoxConnected;
