import React, { useState } from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Messenger.css';
import ConversationSearch from '../ConversationSearch';
import ConversationBar from '../ConversationBar';
import TopBar from '../TopBar';
import 'react-toastify/dist/ReactToastify.css';

export default function Messenger({
  isLoading,
  statuses,
  conversations,
  messages,
  sendMessage,
  selectedConversation,
  setSelectedConversation,
  changeStage,
}) {
  // const [username, setUsername] = useLocalStorage('username', 'John');
  const handleButtonClick = (id) => {
    setSelectedConversation(id);
  };
  // const [roomId, setRoomId] = useState('free');
  // const linkRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className={`messenger ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <TopBar />
      <ConversationSearch
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
      <ConversationBar
        isLoading={isLoading}
        selectedConversation={selectedConversation}
        conversations={conversations}
        messagesCount={messages?.length}
      />
      <ConversationList
        isLoading={isLoading}
        statuses={statuses}
        conversations={conversations}
        selectedConversation={selectedConversation}
        handleButtonClick={handleButtonClick}
        changeStage={changeStage}
      />
      <MessageList
        isLoading={isLoading}
        selectedConversation={selectedConversation}
        messages={messages}
        sendMessage={sendMessage}
      />
    </div>
  );
}
