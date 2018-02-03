import React from 'react';
import { connect } from 'react-redux';

class Friend extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };

    if (props.socket !== undefined) {
      this.props.socket.emit('available', this.props.username);

      this.props.socket.on('notify offline', (data) => {
        if (data === this.props.friend.username) {
          console.log(`${data} signed off`);
          this.setState({ active: false });
        }
      });

      this.props.socket.on('notify available', (data) => {
        if (data === this.props.friend.username) {
          console.log(`${data} is available`);
          this.setState({ active: true });
          this.props.socket.emit('acknowledged', this.props.username);
          // setTimeout(() => { this.props.socket.emit('acknowledged', this.props.username); }, 3000);
        }
      });

      this.props.socket.on('notify acknowledged', (data) => {
        if (data === this.props.friend.username) {
          this.setState({ active: true });
          console.log(data, ' sees youre available');
        }
      });
    }
  }

  handleClick() {
    this.props.changeChat(this.props.friend.username);
  }

  render() {
    if (this.state.active) {
      return (<div className="online" onClick={this.handleClick.bind(this)}>{this.props.friend.username}</div>);
    }
    return (<div className="offline" onClick={this.handleClick.bind(this)}>{this.props.friend.username}</div>);
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
