import React from 'react';
import axios from 'axios';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.update();
  }

  update() {
    if (this.props.message.readReciept === false && this.props.message.to === this.props.username) {
      axios.post('/readReciept', { msg: this.props.message });
    }
  }

  render() {
    return (
      <div className="message">
        <div className="messageDate">
          {this.props.message.timeStamp}
        </div>
        <div className="messageUserName">
          {this.props.message.sentBy}:
        </div>
        <div>
          {this.props.message.text}
        </div>
      </div>
    );
  }
}

export default Message;
