import React from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import axios from 'axios';
import ChatBox from './ChatBox';
import FriendsList from './FriendsList';
import GroupsList from './GroupsList';
import Search from './Search';


const socketUrl = 'http://localhost:3000';
class StudyHall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      messages: [],
      userId: '',
      chat: 'Bob',
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(`authenticated? ${this.props}`);
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
      console.log('Connected!');
      return axios.get(`/username?id=${userId}`)
        .then((username) => {
          this.setState({ userId });
          socket.emit('new user', username);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  testRender() {
    if (this.state.socket !== null) {
      return (
        <div className="Chat studyComp">
          <ChatBox chat={this.state.chat} socket={this.state.socket}/>
        </div>
      );
    } else {
      return;
    }
  }

  changeChat(otherChat) {
    this.setState({ chat: otherChat });
  }

  render() {
    return (
    <div className="studyContainer">
      <div className="Groups studyComp">
        <GroupsList changeChat={this.changeChat.bind(this)}/>
      </div>
      <div className="Friends studyComp">
        <FriendsList socket={this.state.socket} changeChat={this.changeChat.bind(this)}/>
      </div>
      <div className="Search studyComp">
        <Search />
      </div>
      <div>
        {this.testRender()}
      </div>
    </div>
    );
  }
}

const mapStateToProps = state => (
  {
    isAuth: state.isAuth.isAuth,
    userId: state.userId.userId,
  }
);

const StudyHallConnected = connect(mapStateToProps)(StudyHall);

export default StudyHallConnected; // Connected


// export default StudyHall;
