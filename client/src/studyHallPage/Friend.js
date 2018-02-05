import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Friend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.friend.status || 'offline',
      unread: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.chat === this.props.friend.username) {
      this.setState({ unread: 0 });
    }
  }

  componentWillUnmount() {
    if (this.props.chat === this.props.friend.username) {
      this.props.changeChat('No chat selected');
    }
  }

  componentDidMount() {
    this.props.socket.on('notify available', (username, status) => {
      if (username === this.props.friend.username) {
        this.setState({ status });
        setTimeout(() => { this.props.socket.emit('acknowledged', this.props.username); }, 750);
        console.log(`${username} is available`);
      }
    });

    this.props.socket.on('notify acknowledged', (username, status) => {
      if (username === this.props.friend.username) {
        this.setState({ status });
        console.log(username, ' sees youre available and is ', status);
      }
    });

    this.props.socket.on('notify away', (username, status) => {
      if (username === this.props.friend.username) {
        this.setState({ status });
        console.log(username, ' is away');
      }
    });

    this.props.socket.on('notify offline', (username, status) => {
      if (username === this.props.friend.username) {
        this.setState({ status });
        console.log(`${username} signed off`);
      }
    });

    this.props.socket.on('receive message', (data) => {
      const { username } = this.props.friend;
      if (this.props.chat !== username && username === data.sentBy) {
        console.log(`received message from ${data.sentBy} to ${data.to}`);
        this.setState({ unread: this.state.unread + 1 });
      }
    });
  }

  handleClick() {
    this.props.changeChat(this.props.friend.username);
  }

  closeChat() {
    axios.post('/closePrivateChat', {
      user: this.props.username,
      friend: this.props.friend.username,
    })
      .then((res) => {
        console.log('removed: ', res.data);
      });
  }

  deleteUser() {
    axios.post('/deleteUser', { username: this.props.friend.username })
      .then((res) => {
        console.log(res);
      });
  }

  render() {
    return (
      <div>
        <span
          className={`friendName ${this.state.status} ${this.state.activeChat}`}
          onClick={this.handleClick.bind(this)}
          >{this.props.friend.username}
        </span>
        <span onClick={this.closeChat.bind(this)} className='friendRemove'>x</span>
        <span className='friendUnreadMessages'>{this.state.unread}</span>
        <button onClick={this.deleteUser.bind(this)}>delete user</button>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    socket: state.activeSocket.socket,
    username: state.activeSocket.username,
  }
);

const FriendConnected = connect(mapStateToProps)(Friend);

export default FriendConnected;
