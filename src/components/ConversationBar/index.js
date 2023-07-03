import React from 'react';

import './ConversationBar.css';
import ClipLoader from 'react-spinners/ClipLoader';
const ConversationBar = ({
  isLoading,
  selectedConversation,
  conversations,
  messagesCount,
}) => {
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
      <div className="conversation-toolbar"></div>
    </div>
  );
};

export default ConversationBar;
