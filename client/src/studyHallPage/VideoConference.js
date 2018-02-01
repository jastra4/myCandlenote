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

  componentWillMount() {
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
      
    })
  }

};
