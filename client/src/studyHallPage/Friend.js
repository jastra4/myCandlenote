import React from 'react';
import { connect } from 'react-redux';

class Friend extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };

    if (props.socket !== undefined) {
      this.props.socket.on('logged off', (data) => {
        console.log('logged off: ', data);
        if (data === this.props.friend.username) {
          this.setState({ active: false });
        }
      });

      this.props.socket.on('logged on', (data) => {
        console.log('logged on: ', data);
        if (data === this.props.friend.username) {
          this.setState({ active: true });
        }
      });
    }
  }

  handleClick = () => {
    this.props.changeChat(this.props.friend.username);
    this.setState({ active: true });
  }

  otherRender() {
    if (this.state.active) {
      return (<div>online</div>);
    }
    return (<div>offline</div>);
  }

  render() {
    return (
      <div>
        <div>{this.otherRender()}</div>
        <div onClick={this.handleClick.bind(this)}>
          {this.props.friend.username}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  { socket: state.activeSocket.socket }
);

// export default Friend;

const FriendConnected = connect(mapStateToProps)(Friend);

export default FriendConnected;
