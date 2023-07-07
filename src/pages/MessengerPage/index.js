import { Toaster } from 'react-hot-toast';
import Messenger from '../../components/Messenger';
import './MessengerPage.css';
import { useNavigate } from 'react-router-dom';

function MessengerPage({
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
}) {
  const navigate = useNavigate();

  return (
    <div className="messenger-page">
      <Messenger
        filter={filter}
        setFilter={setFilter}
        user={user}
        isLoading={isLoading}
        statuses={statuses}
        conversations={conversations}
        messages={messages}
        sendMessage={sendMessage}
        selectedConversation={selectedConversation}
        setSelectedConversation={setSelectedConversation}
        changeStage={changeStage}
        linkUserToConversation={linkUserToConversation}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
    </div>
  );
}

export default MessengerPage;
