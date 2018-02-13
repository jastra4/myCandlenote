import React from 'react';
import Peer from 'peerjs';

class VideoConference extends React.Component {
  constructor(props) {
    super(props);
    const id = parseInt(Math.random() * 1e4, 10).toString(16);
    this.state = {
      hash: id,
      peer: new Peer({ key: 'o8jk92ig9tdwjyvi' }),
      remoteId: [],
      myId: '',
      initialized: false,
      newCall: [],
    };
    this.handlePeerIdSumbmission = this.handlePeerIdSumbmission.bind(this);
    this.handlePeerIdChange = this.handlePeerIdChange.bind(this);
    this.call = this.call.bind(this);
    this.onReceiveCall = this.onReceiveCall.bind(this);
  }

  componentWillMount() {
    navigator.getUserMedia = (
      navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia
    );

    this.state.peer.on('open', (id) => {
      console.log('Peer id: ', id);
      this.setState({
        myId: id,
        initialized: true,
      });
    }); // eslint-disable-line 

    this.state.peer.on('connection', (connection) => {
      console.log('connection to set on state: ', connection);
      this.setState({ conn: connection }, () => {
        this.state.conn.on('open', () => {
          this.setState({ connected: true });
          console.log('We have been connected!');
          this.state.conn.on('data', this.onReceiveData);
        });
      });
    });
    this.prepareSelfVideo();

    this.state.peer.on('call', (call) => {
      console.log('call data set to state: ', call);
      this.onReceiveCall(call);
    });
  }

  componentWillUnmount() {
    this.state.peer.disconnect();
  }

  handlePeerIdChange(event) {
    console.log('remoteId: ', this.state.remoteId);
    this.setState({ remoteId: [...this.state.remoteId, event.target.value] });
  }

  handlePeerIdSumbmission() {
    console.log('remoteId at submission: ', this.state.remoteId);

    const connection = this.state.peer.connect(this.state.remoteId);
    console.log('New connection object: ', connection);

    this.setState({ conn: connection }, () => {
      this.state.conn.on('open', () => {
        this.setState({ connected: true });
        console.log('Calling from peer id submission');
        this.call();
      });
      this.state.conn.on('data', this.onReceiveData);
    });

    console.log('Connection open after send?', connection.open);
  }

  getMedia(options, success, error) {
    this.state;
    navigator.getUserMedia(options, success, error);
  }

  onReceiveCall(call) {
    this.setState({ newCall: [...this.state.newCall, call] });
    this.getMedia({
      audio: true,
      video: true,
    }, (stream) => {
      console.log('answering...');
      if (this.state.newCall[0]) {
        this.state.newCall[0].answer(stream);
      }
      if (this.state.newCall[1]) {
        this.state.newCall[1].answer(stream);
      }
      if (this.state.newCall[2]) {
        this.state.newCall[2].answer(stream);
      }
    }, (err) => { console.log('Error in on receive call: ', err); });
    if (this.state.newCall[0]) {
      this.state.newCall[0].on('stream', (stream) => {
        const video = document.querySelector('.video-call-one');
        video.src = window.URL.createObjectURL(stream);
      });
    }
    if (this.state.newCall[1]) {
      this.state.newCall[1].on('stream', (stream) => {
        const video = document.querySelector('.video-call-two');
        video.src = window.URL.createObjectURL(stream);
      });
    }
    if (this.state.newCall[2]) {
      this.state.newCall[2].on('stream', (stream) => {
        const video = document.querySelector('.video-call-three');
        video.src = window.URL.createObjectURL(stream);
      });
    }
  }

  prepareSelfVideo() {
    this.getMedia({
      audio: false,
      video: true,
    }, (stream) => {
      const video = document.querySelector('.video-self');
      video.src = window.URL.createObjectURL(stream);
    }, (err) => { console.log('Error in prepare self: ', err); });
  }

  call() {
    this.getMedia({
      audio: true,
      video: true,
    }, (stream) => {
      this.setState({ newCall: this.state.peer.call(this.state.remoteId[0], stream) });
      if (this.state.remoteId[1]) {
        this.setState({ newCall: this.state.peer.call(this.state.remoteId[1], stream) });
      }
      if (this.state.remoteId[2]) {
        this.setState({ newCall: this.state.peer.call(this.state.remoteId[2], stream) });
      }
      console.log('calling...');
    }, (err) => { console.log('Error in call: ', err); });
  }

  render() {
    return (
      <div className="container">
        <nav>Video Chat</nav>
        <div className="video-container">
          <video className="video-call-one" autoPlay></video>
          <video className="video-self" autoPlay></video>
          <div className="share">
            <a>Share - {this.state.myId}</a>
          </div>
          <div>
            <input type="text" className="peer-id" onChange={this.handlePeerIdChange}></input>
            <button onClick={() => { this.handlePeerIdSumbmission(); }}>Connect</button>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoConference;