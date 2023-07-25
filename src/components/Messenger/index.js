import React, { useState } from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Messenger.css';
import ConversationSearch from '../ConversationSearch';
import ConversationBar from '../ConversationBar';
import TopBar from '../TopBar';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Messenger({
  filter,
  setFilter,
  user,
  isLoading,
  statuses,
  conversations,
  messages,
  sendMessage,
  selectedConversation,
  setSelectedConversation,
  changeStage,
  linkUserToConversation,
  searchInput,
  setSearchInput,
  readConversation,
  sendComment,
  refreshLink,
  moneysend,
}) {
  const handleButtonClick = (id) => {
    setSelectedConversation(id);
  };

  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className={`messenger ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <ConversationSearch
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <ConversationBar
        isLoading={isLoading}
        selectedConversation={selectedConversation}
        conversations={conversations}
        messagesCount={messages?.length}
        user={user}
        linkUserToConversation={linkUserToConversation}
        refreshLink={refreshLink}
      />
      <ConversationList
        isLoading={isLoading}
        statuses={statuses}
        conversations={conversations}
        selectedConversation={selectedConversation}
        handleButtonClick={handleButtonClick}
        changeStage={changeStage}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <MessageList
        user={user}
        isLoading={isLoading}
        selectedConversation={selectedConversation}
        messages={messages}
        sendMessage={sendMessage}
        readConversation={readConversation}
        linkUserToConversation={linkUserToConversation}
        conversations={conversations}
        statuses={statuses}
        sendComment={sendComment}
        moneysend={moneysend}
      />
    </div>
  );
}
