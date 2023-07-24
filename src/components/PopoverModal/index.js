import React from 'react';
import './PopoverModal.css';
import ReactModal from 'react-modal';
import PopoverConfirmationForm from '../PopoverConfirmationForm';

const PopoverModal = ({
  sendComment,
  modalIsOpen,
  closeModal,
  modalValue,
  user,
  selectedConversation,
}) => {
  const handleSendComment = async (data) => {
    console.log(data);
    await sendComment(data);
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
        handleSendComment={handleSendComment}
        user={user}
        selectedConversation={selectedConversation}
      />
      {/* <ModalForm createStatus={createStatus} closeModal={closeModal} /> */}
    </ReactModal>
  );
};

export default PopoverModal;
