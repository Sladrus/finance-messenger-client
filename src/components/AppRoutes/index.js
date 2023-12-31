import React, { useEffect, useState } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { authRoutes, publicRoutes } from '../../routes';
import Sidebar from '../Sidebar';
import { useChat } from '../../hooks';
import TopBar from '../TopBar';

const AppRoutes = () => {
  const [selectedConversation, setSelectedConversation] = useState(0);
  const {
    filter,
    setFilter,
    user,
    isAuth,
    login,
    logout,
    isLoading,
    statuses,
    stages,
    boardSections,
    setBoardSections,
    conversations,
    messages,
    sendMessage,
    setStatuses,
    changeStage,
    linkUserToConversation,
    searchInput,
    setSearchInput,
    createStatus,
    getStages,
    managers,
    updateStage,
    deleteStage,
    readConversation,
    sendComment,
    refreshLink,
    moneysend,
    moveStatus,
    dateRange,
    setDateRange,
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
    tasks,
    tags,
    createTag,
    addTag,
    removeTag,
    conversation,
    setConversation,
    conversationLoading,
    setConversationLoading,
  } = useChat(selectedConversation);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(selectedConversation);
  useEffect(() => {
    if (location.pathname === '/') return navigate('/messenger');

    if (location.pathname !== '/auth') return navigate(location.pathname);
  }, []);

  return (
    <>
      {location.pathname !== '/auth' && <Sidebar logout={logout} />}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: 'calc(100% - 85px)',
        }}
      >
        {location.pathname !== '/auth' && (
          <TopBar
            filter={filter}
            setFilter={setFilter}
            user={user}
            stages={stages}
            managers={managers}
            setSelectedConversation={setSelectedConversation}
            dateRange={dateRange}
            setDateRange={setDateRange}
            setConversation={setConversation}
            tags={tags}
          />
        )}

        <Routes>
          {publicRoutes.map(({ path, Component }) => (
            <Route
              key={path}
              path={path}
              element={<Component login={login} />}
              exact
            />
          ))}
          {isAuth &&
            authRoutes.map(({ path, Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <Component
                    filter={filter}
                    setFilter={setFilter}
                    user={user}
                    isLoading={isLoading}
                    statuses={statuses}
                    boardSections={boardSections}
                    setBoardSections={setBoardSections}
                    conversations={conversations}
                    messages={messages}
                    sendMessage={sendMessage}
                    updateStage={updateStage}
                    setStatuses={setStatuses}
                    selectedConversation={selectedConversation}
                    setSelectedConversation={setSelectedConversation}
                    changeStage={changeStage}
                    linkUserToConversation={linkUserToConversation}
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                    //stages
                    createStatus={createStatus}
                    getStages={getStages}
                    deleteStage={deleteStage}
                    //conversations
                    readConversation={readConversation}
                    sendComment={sendComment}
                    managers={managers}
                    refreshLink={refreshLink}
                    moneysend={moneysend}
                    moveStatus={moveStatus}
                    dateRange={dateRange}
                    changeUserToConversation={changeUserToConversation}
                    getConversations={getConversations}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    searchLoading={searchLoading}
                    setSearchLoading={setSearchLoading}
                    nextPageLoading={nextPageLoading}
                    setNextPageLoading={setNextPageLoading}
                    conversationsCount={conversationsCount}
                    createTask={createTask}
                    tasks={tasks}
                    tags={tags}
                    createTag={createTag}
                    addTag={addTag}
                    removeTag={removeTag}
                    conversation={conversation}
                    setConversation={setConversation}
                    conversationLoading={conversationLoading}
                    setConversationLoading={setConversationLoading}
                  />
                }
                exact
              />
            ))}
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </div>
    </>
  );
};

export default AppRoutes;
