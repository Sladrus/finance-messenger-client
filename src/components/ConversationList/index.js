import React, { useState, useEffect, useRef } from 'react';
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
  filter,
  dateRange,
  getConversations,
  currentPage,
  setCurrentPage,
  searchLoading,
  setSearchLoading,
  nextPageLoading,
  setNextPageLoading,
}) {
  const [filteredConversations, setFilteredConversations] = useState([]);

  const containerRef = useRef(null);

  useEffect(() => {
    const filteredData = conversations?.filter((conversation) => {
      // Check if the conversations stage matches the filters stage

      const isStageMatched = filter?.stage
        ? conversation?.stage?.value === filter?.stage
        : true;

      // Check if the conversations user matches the filters user
      const isUserMatched =
        filter?.user === ''
          ? true
          : filter?.user === null
          ? !conversation?.user?._id
          : conversation?.user?._id === filter?.user;

      const unread = conversation?.unreadCount > 0 ? true : false;

      const isUnreadMatched =
        filter?.unread !== '' ? unread === filter?.unread : true;
      const conversationDate = new Date(conversation?.workAt).getTime();
      const startDate = new Date(dateRange[0].startDate).getTime();
      const conversationDay = new Date(conversationDate).getDate();
      const startDay = new Date(startDate).getDate();
      const endDate = new Date(dateRange[0].endDate).getTime();
      const isDateMatched =
        (conversationDate >= startDate && conversationDate <= endDate) ||
        startDay === conversationDay;

      return (
        isStageMatched && isUserMatched && isUnreadMatched && isDateMatched
      );
    });
    const searchedConversations = searchInput
      ? filteredData.filter((o) => {
          return o.title.toLowerCase().includes(searchInput.toLowerCase());
        })
      : filteredData;
    setFilteredConversations(searchedConversations);
  }, [filter, dateRange, searchInput, conversations]);

  useEffect(() => {
    getConversations(currentPage, searchInput);
  }, [searchInput]);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight
      ) {
        setNextPageLoading(true);
        setCurrentPage(currentPage + 1);
        getConversations(currentPage + 1, searchInput);
      }
    };

    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage]);
  return (
    <div ref={containerRef} className="conversation-list">
      <div className="topbar">
        <div className="conversation-list-container">
          {!nextPageLoading && searchLoading ? (
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#101b25',
              }}
            >
              <ClipLoader
                color={'#729bbd'}
                loading={searchLoading}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <ConversationListItem
                key={conversation.chat_id}
                statuses={statuses}
                selectedConversation={selectedConversation}
                handleButtonClick={handleButtonClick}
                data={conversation}
                changeStage={changeStage}
              />
            ))
          )}
          {!searchLoading && !filteredConversations.length && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#101b25',
              }}
            >
              <span style={{ padding: '15px', textAlign: 'center' }}>
                По данному запросу результатов не найдено
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
