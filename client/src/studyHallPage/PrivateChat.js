import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

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
    this.props.socket.on(`${this.props.privateChat.username} signed on`, (username) => {
      if (username === this.props.privateChat.username) {
        this.setState({ status: 'away' });
      }
      this.props.socket.emit('acknowledge', {
        username: this.props.username,
        to: this.props.privateChat.username,
      });
    });

    this.props.socket.emit('friend ping', {
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
      console.log('is available: ', username, this.props.privateChat.username);
      if (username === this.props.privateChat.username) {
        console.log('componentDidMount ', username);
        this.setState({ status: 'available' });
      }
    });

    this.props.socket.on('is away Bob Pennyworth', (username) => {
      console.log('is away: ', username, this.props.privateChat.username);
      if ('Bob Pennyworth' === this.props.privateChat.username) {
        this.setState({ status: 'away' });
      }
    });

    this.props.socket.on('signed off', (username) => {
      if (username === this.props.privateChat.username) {
        this.setState({ status: 'offline' });
      }
    });

    this.props.socket.on(`submitted message ${this.props.privateChat.username}`, () => {
      console.log('message received from: ', this.props.privateChat.username);
      if (this.props.privateChat.username !== this.props.chat) {
        this.setState({ unread: this.state.unread += 1 });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log('2) componentWillReceiveProps: ', nextProps);
    if (nextProps.chat === this.props.privateChat.username) {
      this.setState({ unread: 0 });
    }
    window.setTimeout(this.startListeners, 2000);
    // this.startListeners(nextProps);
  }

  startListeners() {
    console.log('startListeners started');
    console.log('this.state: ', this.state);
    console.log('this.props: ', this.props);
    this.props.socket.on('is away Bob Pennyworth', (username) => {
      console.log('is away: ', username, this.props.privateChat.username);
      if ('Bob Pennyworth' === this.props.privateChat.username) {
        this.setState({ status: 'away' });
      }
    });
    console.log('startListeners ended');    
  }

  // componentWillMount() {
  //   console.log('1) componentWillMount');
  // }

  // componentDidMount() {
  //   console.log('2) ComponentDidMount');
  // }

  // componentWillReceiveProps() {
  //   console.log('3) componentWillReceiveProps');
  // }

  // componentWillUpdate() {
  //   console.log('4) componentWillUpdate');
  // }

  // componentDidUpdate() {
  //   console.log('5) componentDidUpdate');
  // }

  // shouldComponentUpdate() {
  //   console.log('6) shouldComponentUpdate');
  // }

  // componentDidCatch() {
  //   console.log('7) componentDidCatch');
  // }

  // componentWillUnmount() {
  //   console.log('8) componentWillUnmount');
  // }


  handleClick() {
    this.props.changeChat(this.props.privateChat.username, 'private');
  }

  closeSelf() {
    this.props.closeChat(this.props.self, this.props.username, this.props.privateChat.username);
  }

  deleteUser() {
    console.log('deleteUser ', this.props.privateChat.username);
    axios.post('/deleteUser', { username: this.props.privateChat.username })
      .then((res) => {
        console.log(res);
      });
  }

  render() {
    console.log(this.props.privateChat.username, ' rendered');
    return (
      <div>
        <span
          className={`friendName ${this.state.status} ${this.state.activeChat}`}
          onClick={this.handleClick.bind(this)}
          >{this.props.privateChat.username}
        </span>
        <span onClick={this.closeSelf.bind(this)} className='friendRemove'>x</span>
        <span className='friendUnreadMessages'>{this.state.unread}</span>
        <button onClick={this.deleteUser.bind(this)}>delete</button>
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
