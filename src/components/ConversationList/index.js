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
}) {
  return (
    <div className="conversation-list">
      <div className="topbar">
        <div className="conversation-list-container">
          {conversations.map((conversation) => (
            <ConversationListItem
              key={conversation.chat_id}
              statuses={statuses}
              selectedConversation={selectedConversation}
              handleButtonClick={handleButtonClick}
              data={conversation}
              changeStage={changeStage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
