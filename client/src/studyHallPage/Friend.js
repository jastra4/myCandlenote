import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Friend extends React.Component {
  constructor(props) {
    super(props);
    this.state = { status: this.props.friend.status || 'offline' };
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
  }

  handleClick() {
    this.props.changeChat(this.props.friend.username);
  }

  removeFriend() {
    axios.post('/removeFriend', {
      user: this.props.username,
      friend: this.props.friend.username,
    })
      .then((res) => {
        console.log('removed: ', res.data);
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
        <span onClick={this.removeFriend.bind(this)} className='friendRemove'>x</span>
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
