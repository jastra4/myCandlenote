import React from 'react';
import $ from 'jquery';
import Message from './Message';

class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      messages: ['hello world'],
    };

    props.socket.on('new message', (data) => {
      const msg = `to ${data.to}: ${data.text}`;
      console.log(msg);
      this.setState({ messages: this.state.messages.concat([msg]) });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.socket !== null) {
      this.setState({ socket: nextProps.socket });    
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const msg = {
      text: $('#message').val(),
      to: this.props.chat,
    };
    this.state.socket.emit('send message', msg);
    $('#message').val('');
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

export default ChatBox;
