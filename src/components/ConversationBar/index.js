import React, { useEffect } from 'react';

import './ConversationBar.css';
import ClipLoader from 'react-spinners/ClipLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLink, faTag } from '@fortawesome/free-solid-svg-icons';
import ConversationModal from '../ConversationModal';
import { useState } from 'react';

function chatCount(num) {
  const lastDigit = num % 10;
  if (lastDigit === 1 && num !== 11) {
    return 'чат';
  } else if ([2, 3, 4].includes(lastDigit) && (num < 10 || num > 20)) {
    return 'чата';
  } else {
    return 'чатов';
  }
}

function getMessageEnding(count) {
  if (count % 10 === 1 && count !== 11) {
    return 'сообщение';
  } else if (count % 10 >= 2 && count % 10 <= 4 && (count < 5 || count > 20)) {
    return 'сообщения';
  } else {
    return 'сообщений';
  }
}

const ConversationBar = ({
  isLoading,
  selectedConversation,
  conversations,
  messagesCount,
  user,
  linkUserToConversation,
  refreshLink,
  searchLoading,
  nextPageLoading,
  setNextPageLoading,
}) => {
  // const handleLinkButton = async (e) => {
  //   e.stopPropagation();
  //   await linkUserToConversation(selectedConversation, user);
  // };

  const [link, setLink] = useState('');
  const [status, setStatus] = useState('');

  const conversation = conversations.find(
    (o) => o?.chat_id === selectedConversation
  );
  useEffect(() => {
    setLink(conversation?.link);
    setStatus(conversation?.stage?.label);
  }, [conversation]);

  const [conversationModalIsOpen, setConversationModalIsOpen] = useState(false);

  function openModal() {
    if (selectedConversation) setConversationModalIsOpen(true);
  }

  function closeModal(e) {
    e.stopPropagation();
    console.log('CLOSE', conversationModalIsOpen);
    setConversationModalIsOpen(!conversationModalIsOpen);
  }

  return (
    <div onClick={openModal} className="conversation-bar">
      <div className="conversation-container">
        <span className="conversation-bar-title">
          {!conversation
            ? `По данному запросу найдено ${conversations.length} ${chatCount(
                conversations.length
              )}`
            : conversation?.title}
        </span>
        {!nextPageLoading && !searchLoading ? (
          <span className="conversation-title-info">
            {conversation &&
              `${messagesCount || 0} ${getMessageEnding(messagesCount)}`}
          </span>
        ) : (
          <div style={{ height: '16px' }}>
            <ClipLoader
              color={'#729bbd'}
              loading={true}
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
      </div>
      {conversation && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FontAwesomeIcon
            style={{
              color: conversation?.stage?.color,
              // paddingTop: '2px',
              paddingRight: '10px',
              width: '15px',
              height: '15px',
            }}
            icon={faTag}
          />
          <span style={{ fontSize: '14px' }}>{status}</span>
        </div>
      )}

      {/* {conversation && !isLoading && (
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
      )} */}
      <ConversationModal
        conversationModalIsOpen={conversationModalIsOpen}
        closeModal={closeModal}
        conversation={conversation}
        refreshLink={refreshLink}
      />
    </div>
  );
};

export default ConversationBar;
