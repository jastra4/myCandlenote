import React from 'react';
import { connect } from 'react-redux';

class Friend extends React.Component {
  constructor(props) {
    super(props);
    this.state = { status: 'offline' };

    if (props.socket !== undefined) {
      this.props.socket.on('notify offline', (username, status) => {
        if (username === this.props.friend.username) {
          console.log(`${username} signed off`);
          this.setState({ status: status });
        }
      });

      this.props.socket.on('notify available', (username, status) => {
        if (username === this.props.friend.username) {
          console.log(`${username} is available`);
          this.setState({ status: status });
          setTimeout(() => { this.props.socket.emit('acknowledged', this.props.username); }, 1000);
        }
      });

      this.props.socket.on('notify acknowledged', (username, status) => {
        if (username === this.props.friend.username) {
          this.setState({ status: status });
          console.log(username, ' sees youre available and is ', status);
        }
      });

      this.props.socket.on('notify away', (username, status) => {
        if (username === this.props.friend.username) {
          this.setState({ status: status });
          console.log(username, ' is away');
        }
      });
    }
  }
  

  // componentWillUnmount() {
  //   this.props.socket.removeAllListeners();
  // }

  handleClick() {
    this.props.changeChat(this.props.friend.username);
  }

  render() {
    return (
      <div>
        <div 
          className={this.state.status} 
          onClick={this.handleClick.bind(this)}>{this.props.friend.username}
        </div>
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
