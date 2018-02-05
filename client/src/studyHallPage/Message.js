import React from 'react';

const Message = props => (
  <div className="message">
    <div className="messageDate">
      {props.message.timeStamp}
    </div>
    <div className="messageUserName">
      {props.message.sentBy}:
    </div>
    <div>
      {props.message.text}
    </div>
  </div>
);

export default Message;
