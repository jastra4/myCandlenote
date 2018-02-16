import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Icon } from 'semantic-ui-react';
import Peer from 'peerjs'; // eslint-disable-line
import axios from 'axios';
import FriendsListConferencePage from './FriendsListConferencePage';

class VideoConference extends React.Component {
  constructor(props) {
    super(props);
    const id = parseInt(Math.random() * 1e4, 10).toString(16);
    this.state = {
      hash: id,
      peer: this.props.peer,
      remoteId: [],
      myId: '',
      initialized: false,
      newCall: [],
      friends: this.props.friends,
      showInvite: false,
      friendWhoWantsToTalk: {},
    };
    this.handlePeerIdSumbmission = this.handlePeerIdSumbmission.bind(this);
    this.call = this.call.bind(this);
    this.onReceiveCall = this.onReceiveCall.bind(this);
    this.handleVideoConferenceInviteClick = this.handleVideoConferenceInviteClick.bind(this);
  }

  componentDidMount() {
    console.log('Peer prop in the state: ', this.props.peer);

    navigator.getUserMedia = (
      navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia
    );

    // this.props.peer.on('open', (id) => {
    //   console.log('Peer id: ', id);
    //   this.setState({
    //     myId: id,
    //     initialized: true,
    //   });
    // }); // eslint-disable-line
    console.log('state peer object: ', this.state.peer);
    this.setState({
      myId: this.props.peer.id,
      initialized: true,
    });

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

    this.props.socket.on('invited to video conference', (myId, username) => {
      console.log('MyId on invited to conference emitter: ', myId);
      this.setState({
        showInvite: true,
        friendWhoWantsToTalk: {
          myId: myId, // eslint-disable-line
          username: username, // eslint-disable-line
        },
      });
    });

    this.props.socket.on('accepted invite to video conference', (myId) => {
      console.log('MyId on accepted to conference emitter: ', myId);
      this.setState({ remoteId: [...this.state.remoteId, myId] }, () => {
        console.log('My peer id: ', this.state.myId);
        console.log('Remote Id i received and want to call: ', this.state.remoteId[0]);
        this.call();
      });
    });
  }

  componentWillUnmount() {
    this.state.peer.disconnect();
    this.props.socket.removeAllListeners();
  }


  handlePeerIdSumbmission(id, bool) {
    this.state.peer.on('error', function(err) { console.log('error ', err) });

    console.log('new remoteID at submission: ', id);
    console.log('this.state.peer ', this.state.peer);
    const connection = this.state.peer.connect(id);
    console.log('New connection object: ', connection);

    this.setState({
      conn: connection,
      remoteId: [...this.state.remoteId, id],
      showInvite: false,
    }, () => {
      this.state.conn.on('open', () => {
        this.setState({ connected: true });
        console.log('Calling from peer id submission');
        this.call();
      });
      console.log('Acepting invite to Video Conference');
      if (bool) {
        this.props.socket.emit('accept invite to video conference', {
          username: this.props.username,
          friendName: this.state.friendWhoWantsToTalk.username,
          myId: this.state.myId,
        });
      }
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
    }, (err) => { console.log('Error in on receive call: ', err); });
    if (this.state.newCall[0]) {
      this.state.newCall[0].on('stream', (stream) => {
        const video = document.querySelector('.video-call-one');
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
      console.log('calling...');
    }, (err) => { console.log('Error in call: ', err); });
  }

  handleVideoConferenceInviteClick(friendName) {
    console.log('Does the thing!');
    this.props.socket.emit('invite to video conference', {
      username: this.props.username,
      friendName: friendName, // eslint-disable-line
      myId: this.state.myId,
    });
  }

  handleRemoveFriend(friendId) {
    console.log('Removed Friend:', friendId);
    this.props.handleRemoveFriend(friendId);
    axios.post('/api/removeFriend', {
      friendId,
      userId: this.props.id,
    })
      .then(res => console.log('Removed response:', res))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="container">
        <div className="video-container">
          <video className="video-call-one" height="447" width="600" autoPlay></video>
          <video className="video-self" autoPlay></video>
        </div>
        <div className="friends-list-container">
          <FriendsListConferencePage
            friends={this.state.friends}
            handleRemoveFriend={this.handleRemoveFriend}
            handleVideoConferenceInviteClick={this.handleVideoConferenceInviteClick}
          />
        </div>
          <Modal open={this.state.showInvite} >
            <Modal.Header as="h1">
              Video Conference Invitation
            </Modal.Header>
            <Modal.Content as="p">
Do you want to video chat with {this.state.friendWhoWantsToTalk.username} from your friends list?
            </Modal.Content>
            <Modal.Actions>
              <Button
                color='red'
                onClick={() => this.setState({
                  showInvite: false,
                  friendWhoWantsToTalk: {},
                })}
              >
                <Icon name='remove' /> No
              </Button>
              <Button color='green' onClick={() => this.handlePeerIdSumbmission(this.state.friendWhoWantsToTalk.myId, true)}>
                <Icon name='checkmark' /> Yes
              </Button>
            </Modal.Actions>
          </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state in mapStateToProps: ', state);
  return (
    {
      peer: state.peerID.peer,
      friends: state.user.currentUser.friends,
      socket: state.activeSocket.socket,
      username: state.activeSocket.username,
    }
  );
};

const VideoConferenceConnected = connect(mapStateToProps)(VideoConference);

export default VideoConferenceConnected;
