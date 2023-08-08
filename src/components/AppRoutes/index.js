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
  } = useChat(selectedConversation);
  const location = useLocation();
  const navigate = useNavigate();

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
          minHeight: '100%',
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
