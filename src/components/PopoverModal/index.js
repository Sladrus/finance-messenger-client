import React from 'react';
import './PopoverModal.css';
import ReactModal from 'react-modal';
import PopoverConfirmationForm from '../PopoverConfirmationForm';

const PopoverModal = ({
  sendMessage,
  modalIsOpen,
  closeModal,
  modalValue,
  user,
  selectedConversation,
}) => {
  const handleSendMessage = async (data) => {
    console.log(data);
    // await sendMessage({
    //   user: user,
    //   text: text,
    //   selectedConversation: selectedConversation,
    //   type: 'text',
    // });
  };
  return (
    <ReactModal
      ariaHideApp={false}
      className="modal-item"
      overlayClassName="modal-overlay"
      isOpen={modalIsOpen}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      // style={customStyles}
      contentLabel="Example Modal"
    >
      <PopoverConfirmationForm
        closeModal={closeModal}
        modalValue={modalValue}
        handleSendMessage={handleSendMessage}
        user={user}
        selectedConversation={selectedConversation}
      />
      {/* <ModalForm createStatus={createStatus} closeModal={closeModal} /> */}
    </ReactModal>
  );
};

export default PopoverModal;
