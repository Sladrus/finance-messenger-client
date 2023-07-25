import React, { useEffect } from 'react';
import './ConversationModal.css';
import ReactModal from 'react-modal';
import ConversationModalForm from '../ConversationModalForm';

const ConversationModal = ({
  conversationModalIsOpen,
  closeModal,
  conversation,
}) => {
  return (
    <ReactModal
      ariaHideApp={false}
      className="conversation-modal-item"
      overlayClassName="conversation-modal-overlay"
      isOpen={conversationModalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
    >
      <ConversationModalForm
        closeModal={closeModal}
        conversation={conversation}
      />
    </ReactModal>
  );
};

export default ConversationModal;
