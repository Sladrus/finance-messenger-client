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

const AppRoutes = () => {
  const [selectedConversation, setSelectedConversation] = useState(0);
  const {
    user,
    isAuth,
    login,
    logout,
    isLoading,
    statuses,
    conversations,
    messages,
    sendMessage,
    updateStatuses,
    setStatuses,
    changeStage,
  } = useChat(selectedConversation);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== '/auth') navigate(location.pathname);
  }, []);

  return (
    <>
      {location.pathname !== '/auth' && <Sidebar logout={logout} />}
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
                  user={user}
                  isLoading={isLoading}
                  statuses={statuses}
                  conversations={conversations}
                  messages={messages}
                  sendMessage={sendMessage}
                  updateStatuses={updateStatuses}
                  setStatuses={setStatuses}
                  selectedConversation={selectedConversation}
                  setSelectedConversation={setSelectedConversation}
                  changeStage={changeStage}
                />
              }
              exact
            />
          ))}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
