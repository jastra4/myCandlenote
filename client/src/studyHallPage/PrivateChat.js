import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class PrivateChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.privateChat.status || 'offline',
      unread: 0,
      selected: false,
    };
    this.startListeners = this.startListeners.bind(this);
  }

  updateUnread(nextProps = this.props.chat) {
    const friendName = this.props.privateChat.username;
    if (nextProps.chat === this.props.privateChat.username) {
      this.setState({
        unread: 0,
        selected: true,
      });
    } else {
      axios.get(`/loadMyMessages?username=${this.props.username}&&chatName=${friendName}`)
        .then((messages) => {
          let count = 0;
          messages.data.forEach((message) => {
            if (message.readReciept === false) {
              console.log('message: ', message);
              count += 1;
            }
          });
          this.setState({
            unread: count,
            selected: false,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  componentDidMount() {
    this.props.socket.removeAllListeners();
    const friendName = this.props.privateChat.username;

    this.updateUnread();

    this.props.socket.emit('pingFriend', {
      username: this.props.username,
      friend: friendName,
    });
    this.startListeners();
  }

  componentWillReceiveProps(nextProps) {
    this.updateUnread(nextProps);
    this.props.socket.removeAllListeners();
    window.setTimeout(this.startListeners, 700);
  }

  startListeners() {
    const friendName = this.props.privateChat.username;

    this.props.socket.emit('pingFriend', {
      username: this.props.username,
      friend: friendName,
    });

    this.props.socket.on(`response ${friendName}`, (status) => {
      console.log(`'resonse' set ${friendName} to ${status}`);
      this.setState({ status });
    });

    this.props.socket.on(`${friendName} signed on`, () => {
      this.setState({ status: 'away' });
    });

    this.props.socket.on(`${friendName} signed off`, () => {
      this.setState({ status: 'offline' });
    });

    this.props.socket.on(`${friendName} is away`, () => {
      this.setState({ status: 'away' });
    });

    this.props.socket.on(`${friendName} is available`, () => {
      console.log(`'is available' set ${friendName} to available`);
      this.setState({ status: 'available' });
    });

    this.props.socket.on(`submitted message ${friendName}`, () => {
      if (this.props.chat !== friendName) {
        this.setState({ unread: this.state.unread += 1 });
      }
    });
  }

  handleClick() {
    this.props.changeChat(this.props.privateChat.username, 'private', '');
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
      <div className={`chatContainer chatSelected${this.state.selected}`}>
        <i className={`${this.state.status} circle icon`}></i>
        <span
          className='chatName'
          onClick={this.handleClick.bind(this)}>
          {this.props.privateChat.username}
        </span>
        <span onClick={this.closeSelf.bind(this)} className='closeChat'>X</span>
        <span className={`numUnread numUnread${this.state.unread}`}>{this.state.unread}</span>
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
