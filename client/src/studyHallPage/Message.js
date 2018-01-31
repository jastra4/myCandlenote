import React from 'react';
import ta from 'time-ago';

const Message = (props) => (
	<div>
	  <div>
	  	{ta.ago(props.message.timeStamp)}
	  </div>
	  <div>
	  	{props.message.sentBy}:
	  </div>
	  <div>
	  	{props.message.text}
	  </div>
  </div>
);

export default Message;
