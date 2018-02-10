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
    console.log('update: ', this.props.message);
    if (this.props.message.readReciept === false) {
      console.log('send axios');
      axios.post('/readReciept', { msg: this.props.message })
        .then((res) => {
          console.log(res);
        });
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
