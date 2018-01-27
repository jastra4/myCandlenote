import React from 'react';
import io from 'socket.io-client';
import $ from 'jquery';

const socketUrl = 'http://localhost:3000';
export default class Layout extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      socket: null,
      messages: [],
    };
  }

  componentWillMount() {
    this.initSocket();
  }

  initSocket = () => {
    const socket = io(socketUrl);
    socket.on('connect', () => {
      this.setState({ socket });
    });

    socket.on('new message', (data) => {
      console.log(data);
      this.setState({
        messages: this.state.messages.concat([data]),
      });
    });
  }

  sendMessage(e) {
    e.preventDefault();
    const socket = io.connect();
    socket.emit('send message', $('#message').val());
    $('#message').val('');
  }

  render = () => {
    return (
      <div>
        This is the Chat component
        <div id="contentWrap">
          <div id="chatWrap"> {this.state.messages}
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
}