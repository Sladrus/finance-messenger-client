import Messenger from '../../components/Messenger';
import './MessengerPage.css';

function MessengerPage({
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
}) {
  return (
    <div className="messenger-page">
      <Messenger
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
      />
    </div>
  );
}

export default MessengerPage;
