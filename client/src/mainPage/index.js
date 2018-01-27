import React, { Component } from 'react';
import io from 'socket.io-client';

const socketUrl = 'http://localhost:3000';
export default class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  onClick() {
    this.initSocket();
  }

  initSocket = () => {
    console.log('initSocket ran');
    const socket = io(socketUrl);
  }

  render = () => (
    <div>
      <h1>Main Page</h1>
      <p>Hello World :)</p>
      <button onClick={this.onClick.bind(this)}></button>
    </div>
  );
}
