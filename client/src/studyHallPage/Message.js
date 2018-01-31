import React from 'react';

const Message = (props) => (
	<div>
	  <div>
	  	{props.message.timeStamp}
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
