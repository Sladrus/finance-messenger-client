import React, { useState, useEffect } from 'react';
import ConversationListItem from '../ConversationListItem';

import './ConversationList.css';
import ClipLoader from 'react-spinners/ClipLoader';

export default function ConversationList({
  isLoading,
  statuses,
  conversations,
  selectedConversation,
  handleButtonClick,
  changeStage,
  searchInput,
  setSearchInput,
}) {
  const filteredConversations = searchInput
    ? conversations.filter((o) => {
        console.log(o.title, searchInput);
        return o.title.toLowerCase().includes(searchInput.toLowerCase());
      })
    : conversations;
  return (
    <div className="conversation-list">
      <div className="topbar">
        <div className="conversation-list-container">
          {filteredConversations.map((conversation) => (
            <ConversationListItem
              key={conversation.chat_id}
              statuses={statuses}
              selectedConversation={selectedConversation}
              handleButtonClick={handleButtonClick}
              data={conversation}
              changeStage={changeStage}
            />
          ))}
          {!isLoading && !filteredConversations.length && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#101b25',
                paddingTop: '20px',
              }}
            >
              <span>Нет таких чатов</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
