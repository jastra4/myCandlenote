import React from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import axios from 'axios';
import ChatBox from './ChatBox';
import FriendsListConnected from './FriendsList';
import GroupsList from './GroupsList';
import Search from './Search';
import VideoConference from './VideoConference';

const socketUrl = 'http://localhost:3000';
class StudyHall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      username: '',
      chat: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(`authenticated? ${nextProps.isAuth}`);
    if (nextProps.isAuth) {
      this.initSocket(nextProps.userId);
    } else {
      console.log('Did not create connection');
    }
  }

  initSocket(userId) {
    const socket = io(socketUrl);
    this.setState({ socket });
    socket.on('connect', () => {
      console.log('Socket connected!');
      return axios.get(`/username?id=${userId}`)
        .then((username) => {
          this.setState({ username });
          socket.emit('new user', username);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  renderChat() {
    if (this.state.socket !== null) {
      return (
        <div className="Chat studyComp">
          <ChatBox
            chat={this.state.chat}
            socket={this.state.socket}
            username={this.state.username}
          />
        </div>
      );
    }
    return (<div></div>);
  }

  changeChat(otherChat) {
    this.setState({ chat: otherChat });
  }

  render() {
    if (this.state.socket !== null) {
      return (
      <div className="studyContainer">
        <div className="Groups studyComp">
          <GroupsList changeChat={this.changeChat.bind(this)}/>
        </div>
        <div className="Friends studyComp">
          <FriendsListConnected socket={this.state.socket} changeChat={this.changeChat.bind(this)}/>
        </div>
        <div className="Search studyComp">
          <Search />
        </div>
        <div>
          {this.renderChat()}
        </div>
        <VideoConference />
      </div>
      );
    }
    return (<div></div>);
  }
}

const mapStateToProps = state => (
  {
    isAuth: state.isAuth.isAuth,
    userId: state.userId.userId,
  }
);

const StudyHallConnected = connect(mapStateToProps)(StudyHall);

export default StudyHallConnected;
