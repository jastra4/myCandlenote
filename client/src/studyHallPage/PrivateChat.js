import React from 'react';
import { connect } from 'react-redux';

class PrivateChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.privateChat.status || 'offline',
      unread: 0,
    };
    this.startListeners = this.startListeners.bind(this);
  }

  componentDidMount() {
    const friendName = this.props.privateChat.username;

    this.props.socket.emit('ping222', {
      username: this.props.username,
      friend: friendName,
    });

    this.props.socket.on(`response ${friendName}`, (status) => {
      this.setState({ status });
    });

    this.props.socket.on(`${friendName} signed on`, () => {
      this.setState({ status: 'away' });
    });

    this.props.socket.on(`${friendName} signed off`, () => {
      this.setState({ status: 'offline' });
    });

    this.props.socket.on(`${friendName} is available`, () => {
      this.setState({ status: 'available' });
    });

    this.props.socket.on(`${friendName} is away`, () => {
      this.setState({ status: 'away' });
    });

    this.props.socket.on(`submitted message ${friendName}`, () => {
      if (friendName !== this.props.chat) {
        this.setState({ unread: this.state.unread += 1 });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.chat === this.props.privateChat.username) {
      this.setState({ unread: 0 });
    }
    window.setTimeout(this.startListeners, 750);
  }

  startListeners() {
    const friendName = this.props.privateChat.username;

    this.props.socket.on(`${friendName} is away`, () => {
      this.setState({ status: 'away' });
    });

    this.props.socket.on(`${friendName} is available`, () => {
      this.setState({ status: 'available' });
    });

    this.props.socket.on(`submitted message ${friendName}`, () => {
      this.setState({ unread: this.state.unread += 1 });
    });
  }

  handleClick() {
    this.props.changeChat(this.props.privateChat.username, 'private');
  }

  closeSelf() {
    this.props.closeChat(this.props.self, this.props.username, this.props.privateChat.username);
  }

  // deleteUser() {
  //   axios.post('/deleteUser', { username: this.props.privateChat.username })
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
        <span onClick={this.closeSelf.bind(this)} className='friendRemove'>x</span>
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
