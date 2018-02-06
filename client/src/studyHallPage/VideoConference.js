import React from 'react';
import Peer from 'peerjs';

class VideoConference extends React.Component {
  constructor(props) {
    super(props);
    const id = parseInt(Math.random() * 1e4, 10).toString(16);
    this.state = {
      hash: id,
      peer: new Peer({ key: 'o8jk92ig9tdwjyvi' }),
      remoteId: '',
      myId: '',
      initialized: false,
    };
    // this.call = this.call.bind(this);
    this.handlePeerIdSumbmission = this.handlePeerIdSumbmission.bind(this);
    this.handlePeerIdChange = this.handlePeerIdChange.bind(this);
    this.call = this.call.bind(this);
    this.onReceiveData = this.onReceiveData.bind(this);
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
    this.setState({ remoteId: event.target.value });
  }

  handlePeerIdSumbmission() {
    console.log('remoteId at submission: ', this.state.remoteId);

    const connection = this.state.peer.connect(this.state.remoteId);
    console.log('New connection object: ', connection);

    this.setState({ conn: connection }, () => {
      this.state.conn.on('open', () => {
        this.setState({ connected: true });
      });
      this.state.conn.on('data', this.onReceiveData);
    });

    console.log('Connection open after send?', connection.open);
  }

  testSendData() {
    console.log('Current connection on the state: ', this.state.conn);
    this.state.conn.send('Hello hello I sent a thing!');
  }

  // callPeer() {
  //   const call = this.state.peer.call(this.state.remoteId, this.getMedia({
  //     audio: true,
  //     video: true,
  //   }), (stream) => {
  //     const video = document.querySelector('.video-call');
  //   });
  //   console.log('remoteId at call peer: ', this.state.remoteId);
  //   console.log('call data at call peer: ', call);
  //   // this.setState({ newCall: call }, () => {
  //   //   console.log('Call data: ', call);
  //   //   console.log('Call data on the state: ', this.state.call);
  //   //   this.state.newCall.on('stream', this.onReceiveCall);
  //   // });
  // }

  onReceiveData(data) {
    console.log('Received', data);
  }

  getMedia(options, success, error) {
    this.state;
    navigator.getUserMedia(options, success, error);
  }

  onReceiveCall(call) {
    this.setState({ newCall: call });
    this.getMedia({
      audio: true,
      video: true,
    }, (stream) => {
      console.log('answering...');
      this.state.newCall.answer(stream);
    }, (err) => { console.log('Error in on receive call: ', err); });
    this.state.newCall.on('stream', (stream) => {
      const video = document.querySelector('.video-call');
      video.src = window.URL.createObjectURL(stream);
    });
  }

  // onReceiveStream(stream) {
  //   this.state;
  //   const video = document.querySelector('.video-call');
  //   video.src = window.URL.createObjectURL(stream);
  // }

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
    // const id = document.querySelector('.peer-id');
    this.getMedia({
      audio: true,
      video: true,
    }, (stream) => {
      this.setState({ newCall: this.state.peer.call(this.state.remoteId, stream) });
      console.log('calling...');
      this.state.peer.on('call', this.onReceiveCall);
    }, (err) => { console.log('Error in call: ', err); });
  }

  // connect() {
  //   const peerId = this.state.peer_id;
  //   const connection = this.state.peer.connect(peerId);
  //   this.setState({ conn: connection }, () => {
  //     this.state.conn.on('open', () => {
  //       this.setState({ connected: true });
  //     });
  //     this.state.conn.on('data');
  //   });
  // }

  render() {
    return (
      <div className="container">
        <nav>Video Chat</nav>
        <div className="video-container">
          <video className="video-call" autoPlay></video>
          <video className="video-self" autoPlay></video>
          <div className="share">
            <a>Share - {this.state.myId}</a>
          </div>
          <div>
            <input type="text" className="peer-id" onChange={this.handlePeerIdChange}></input>
            <button onClick={() => { this.handlePeerIdSumbmission(); }}>Connect</button>
            <button onClick={() => { this.call(); }}>Call</button>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoConference;
