import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import { connect } from 'react-redux';
import Peer from 'peer';

class VideoConference extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      peer: new Peer({ key: 'o8jk92ig9tdwjyvi' }),
      my_id: '',
      peer_id: '',
      initialized: false,
    };
  }

  componentDidMount() {
    navigator.getUserMedia = (
      navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia
    );

    this.state.peer.on('open', (id) => {
      console.log('My Peer id is: ', id);
      this.setState({
        my_id: id,
        initialized: true,
      });
    });

    this.state.peer.on('connection', (connection) => {
      console.log('Someone connected!');
      console.log(connection);
      this.setState({ conn: connection }, () => {
        this.state.conn.on('open', () => {
          this.setState({ connected: true });
        });
      });
    });
  }

  componentWillUnmount() {
    this.state.peer.destroy();
  }

  connect() {
    let peer_id = this.state.peer_id;
    let connection = this.state.peer.connect(peer_id);
    this.setState({ conn: connection }, () => {
      this.state.conn.on('open', () => {
        this.setState({ connected: true });
      });
      this.state.conn.on('data')
    });
  }

};
