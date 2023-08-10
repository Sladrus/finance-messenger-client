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
}) {
  const navigate = useNavigate();
  console.log(currentPage);

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
        readConversation={readConversation}
        sendComment={sendComment}
        refreshLink={refreshLink}
        moneysend={moneysend}
        dateRange={dateRange}
        managers={managers}
        changeUserToConversation={changeUserToConversation}
        getConversations={getConversations}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchLoading={searchLoading}
        setSearchLoading={setSearchLoading}
        nextPageLoading={nextPageLoading}
        setNextPageLoading={setNextPageLoading}
        conversationsCount={conversationsCount}
      />
    </div>
  );
}

export default MessengerPage;
