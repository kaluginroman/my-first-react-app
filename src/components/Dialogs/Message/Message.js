import React from 'react';
import './Message.css';

const Message = (props) => {

  return (
    <div className="message">
      {props.message}
    </div>
  )
}

export default Message;
