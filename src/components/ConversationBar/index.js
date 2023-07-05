import React from 'react';

import './ConversationBar.css';
import ClipLoader from 'react-spinners/ClipLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLink } from '@fortawesome/free-solid-svg-icons';

const ConversationBar = ({
  isLoading,
  selectedConversation,
  conversations,
  messagesCount,
  user,
  linkUserToConversation,
}) => {
  const handleLinkButton = async (e) => {
    e.stopPropagation();
    if (conversation.user) {
      conversation.user = null;
      await linkUserToConversation(conversation);
    } else {
      conversation.user = user._id;
      await linkUserToConversation(conversation);
      conversation.user = { username: user.username };
    }
  };
  const conversation = conversations.find(
    (o) => o.chat_id === selectedConversation
  );
  function getMessageEnding(count) {
    if (count % 10 === 1 && count !== 11) {
      return 'сообщение';
    } else if (
      count % 10 >= 2 &&
      count % 10 <= 4 &&
      (count < 5 || count > 20)
    ) {
      return 'сообщения';
    } else {
      return 'сообщений';
    }
  }
  return (
    <div className="conversation-bar">
      <div className="conversation-container">
        <span className="conversation-title">
          {!conversation ? 'Выберите чат для общения' : conversation?.title}
        </span>
        {!isLoading ? (
          <span className="conversation-title-info">
            {conversation &&
              `${messagesCount || 0} ${getMessageEnding(messagesCount)}`}
          </span>
        ) : (
          <div style={{ height: '16px' }}>
            <ClipLoader
              color={'#729bbd'}
              loading={isLoading}
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
      </div>

      {conversation && !isLoading && (
        <div className="conversation-toolbar">
          {conversation?.user && (
            <div className="board-user">
              <FontAwesomeIcon className="board-user-icon" icon={faUser} />
              <span>{conversation?.user.username}</span>
            </div>
          )}
          <div onClick={handleLinkButton} className="take-button">
            <FontAwesomeIcon
              style={conversation?.user && { color: '#73b9f3' }}
              className="take-button-icon"
              icon={faLink}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationBar;
