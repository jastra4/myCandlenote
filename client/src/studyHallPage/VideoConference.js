import React from 'react';
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

    this.prepareSelfVideo();
  }

  getMedia(options, success, error) {
    this.state;
    navigator.getUserMedia(options, success, error);
  }

  onReceiveCall(call) {
    this.getMedia({
      audio: true,
      video: true,
    }, (stream) => {
      console.log('answering...');
      call.answer(stream);
    }, (err) => { console.log(err); });
    call.on('stream', (stream) => {
      const video = document.querySelector('video');
      video.src = window.URL.createObjectURL(stream);
    });
  }

  onReceiveStream(stream) {
    this.state;
    const video = document.querySelector('.video-call');
    video.src = window.URL.createObjectURL(stream);
  }

  prepareSelfVideo() {
    this.getMedia({
      audio: false,
      video: true,
    }, (stream) => {
      const video = document.querySelector('.video-self');
      video.src = window.URL.createObjectURL(stream);
    }, (err) => { console.log(err); });
  }

  call(id) {
    this.getMedia({
      audio: true,
      video: true,
    }, (stream) => {
      const call = this.state.peer.call(id, stream);
      console.log('calling...');
      call.on('stream', this.onReceiveStream);
    }, (err) => { console.log(err); });
  }

  componentWillUnmount() {
    this.state.peer.destroy();
  }

  connect() {
    const peerId = this.state.peer_id;
    const connection = this.state.peer.connect(peerId);
    this.setState({ conn: connection }, () => {
      this.state.conn.on('open', () => {
        this.setState({ connected: true });
      });
      this.state.conn.on('data');
    });
  }
}

export default VideoConference;
