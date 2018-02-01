import React from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socketUrl = 'http://localhost:3000';
export default class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    axios.get('/api/userid') // get user id
      .then((res) => {
        const userid = res;
        console.log(userid);
        const socket = io(socketUrl); // create connection
        socket.on('connect', () => {
          axios.get(`/username?id=${userid}`) // add user id to connection
            .then((res) => {
              //socket.emit('new user', res.data);
              console.log(`${res} connected!`);
            });
        });
      });
  }

  render = () => (
    <div>
      <h1>Main Page</h1>
      <p>Hello World :)</p>
      <a href="/auth/google">Sign In with Google</a>
    </div>
  );
}
