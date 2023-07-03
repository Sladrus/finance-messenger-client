import React from 'react';
import './ReplyButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';

const ReplyButton = () => {
  return (
    <div className="reply-container">
      <FontAwesomeIcon className="reply-button" icon={faReply} />
    </div>
  );
};

export default ReplyButton;
