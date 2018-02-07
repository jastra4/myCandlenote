import React from 'react';
import { connect } from 'react-redux';

class PrivateChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.privateChat.status || 'offline',
      unread: 0,
    };
  }

  componentWillUnmount() {
    if (this.props.chat === this.props.privateChat.username) {
      this.props.changeChat('No chat selected');
    }
  }

  componentDidMount() {
    this.props.socket.on(`${this.props.privateChat.username} signed on`, (username) => {
      if (username === this.props.privateChat.username) {
        this.setState({ status: 'away' });
      }
      this.props.socket.emit('acknowledge', {
        username: this.props.username,
        to: this.props.privateChat.username,
      });
    });
    this.props.socket.emit('wftiswrongwithping', {
      username: this.props.username,
      to: this.props.privateChat.username,
    });

    this.props.socket.on(`sent ping ${this.props.privateChat.username}`, (status) => {
      this.setState({ status });
    });

    this.props.socket.on('acknowledged', (username, status) => {
      if (username === this.props.privateChat.username) {
        this.setState({ status });
      }
    });

    this.props.socket.on('is available', (username) => {
      if (username === this.props.privateChat.username) {
        this.setState({ status: 'available' });
      }
    });

    this.props.socket.on('is away', (username) => {
      if (username === this.props.privateChat.username) {
        this.setState({ status: 'away' });
      }
    });

    this.props.socket.on('signed off', (username) => {
      if (username === this.props.privateChat.username) {
        this.setState({ status: 'offline' });
      }
    });

    this.props.socket.on(`submitted message ${this.props.chat.username}`, () => {
      if (this.props.privateChat.username !== this.props.chat) {
        this.setState({ unread: this.state.unread += 1 });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.chat === this.props.privateChat.username) {
      this.setState({ unread: 0 });
    }
  }

  handleClick() {
    this.props.changeChat(this.props.privateChat.username);
  }

  closeChat() {
    this.props.socket.emit('close private chat', {
      username: this.props.username,
      otheruser: this.props.privateChat.username,
    });
  }

  // deleteUser() {
  //   axios.post('/deleteUser', { username: this.props.friend.username })
  //     .then((res) => {
  //       console.log(res);
  //     });
  // }

  render() {
    return (
      <div>
        <span
          className={`friendName ${this.state.status} ${this.state.activeChat}`}
          onClick={this.handleClick.bind(this)}
          >{this.props.privateChat.username}
        </span>
        <span onClick={this.closeChat.bind(this)} className='friendRemove'>x</span>
        <span className='friendUnreadMessages'>{this.state.unread}</span>
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

const PrivateChatConnected = connect(mapStateToProps)(PrivateChat);

export default PrivateChatConnected;
