import React, { Component } from 'react';
import io from 'socket.io-client';

const socketUrl = 'http://localhost:3000';
//192.168.0.102
//192.168.1.172
//192.168.1.255
export default class Layout extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      socket: null,
    };
  }

  onClick() {
    this.initSocket();
  }

  componentWillMount () {
    //this.initSocket();
  }

  initSocket = () => {
    console.log('socketUrl: ', socketUrl);
    const socket = io(socketUrl);
    console.log('socket: ', socket);
    
    // socket.on('connect', () => {
    //   console.log('connected');
    // });
    // this.setState({ socket });
  }

  render = () => {
    const { title } = this.props
    return (
      <div>
        { title }
        <button onClick={this.onClick.bind(this)}></button>
      </div>
    );
  }
}