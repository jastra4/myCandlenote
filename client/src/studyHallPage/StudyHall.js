import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import io from 'socket.io-client';
import ChatBox from './ChatBox';
import FriendsListConnected from './FriendsList';
import GroupsList from './GroupsList';
import SearchConnected from './Search';
import VideoConference from './VideoConference';
import activeSocket from '../actions/activeSocket'; // auth stuff

const socketUrl = 'http://localhost:3000';
class StudyHall extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chat: '' };
  }

  componentDidMount() {
    if (this.props.updatedSocket === undefined) {
      this.identifyUser();
    }
  }

  identifyUser() {
    axios.get('/api/userid')
      .then((res) => {
        if (res.data.userid !== undefined) {
          this.initSocket(res.data.userid);
        } else {
          console.log('Not logged in');
        }
      });
  }

  initSocket(userid) {
    const socket = io(socketUrl);
    socket.on('connect', () => {
      this.nameSocket(socket, userid);
    });
  }

  nameSocket = (socket, userid) => {
    axios.get(`/identifySocket?id=${userid}`)
      .then((res) => {
        // socket.emit('available', res.data);
        this.props.activeSocket(socket, res.data);
        console.log(`${res.data} connected!`);
      });
  }

  changeChat(username) {
    this.setState({ chat: username });
  }

  render() {
    if (this.props.updatedSocket !== undefined) {
      return (
        <div className="studyContainer">
          <div className="Groups studyBackground">
            <GroupsList changeChat={this.changeChat.bind(this)}/>
          </div>
          <div className="Friends studyBackground">
            <FriendsListConnected changeChat={this.changeChat.bind(this)}/>
          </div>
          <div className="Search studyBackground">
            <SearchConnected />
          </div>
          <div className="Chat studyBackground">
            <ChatBox chat={this.state.chat}/>
          </div>
        </div>
      );
    } else {
      return (<div>Loading...</div>);
    }
  }
}

const mapStateToProps = state => (
  { updatedSocket: state.activeSocket.socket }
);

const mapDispatchToProps = dispatch => (
  { activeSocket: (socket, username) => dispatch(activeSocket(socket, username)) }
);

const StudyHallConnected = connect(mapStateToProps, mapDispatchToProps)(StudyHall);

export default StudyHallConnected;

// <VideoConference />
