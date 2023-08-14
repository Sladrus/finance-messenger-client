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
  dateRange,
  managers,
  changeUserToConversation,
  getConversations,
  currentPage,
  setCurrentPage,
  searchLoading,
  setSearchLoading,
  nextPageLoading,
  setNextPageLoading,
  conversationsCount,
  createTask,
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
        searchLoading={searchLoading}
        setSearchLoading={setSearchLoading}
        setCurrentPage={setCurrentPage}
      />
      <ConversationBar
        isLoading={isLoading}
        selectedConversation={selectedConversation}
        conversations={conversations}
        messagesCount={messages?.length}
        user={user}
        linkUserToConversation={linkUserToConversation}
        refreshLink={refreshLink}
        searchLoading={searchLoading}
        nextPageLoading={nextPageLoading}
        setNextPageLoading={setNextPageLoading}
        conversationsCount={conversationsCount}
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
        filter={filter}
        dateRange={dateRange}
        getConversations={getConversations}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchLoading={searchLoading}
        setSearchLoading={setSearchLoading}
        nextPageLoading={nextPageLoading}
        setNextPageLoading={setNextPageLoading}
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
        managers={managers}
        changeStage={changeStage}
        changeUserToConversation={changeUserToConversation}
        createTask={createTask}
        getConversations={getConversations}
      />
    </div>
  );
}
