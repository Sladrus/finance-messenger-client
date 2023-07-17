import React from 'react';
import './CreateBoardPageItemModal.css';
import ReactModal from 'react-modal';
import ModalForm from '../ModalForm';

const CreateBoardPageItemModal = ({
  modalIsOpen,
  closeModal,
  createStatus,
}) => {
  return (
    <ReactModal
      ariaHideApp={false}
      className="modal-item"
      overlayClassName="modal-overlay"
      isOpen={modalIsOpen}
      //   onAfterOpen={afterOpenModal}
    //   onRequestClose={closeModal}
      // style={customStyles}
      contentLabel="Example Modal"
    >
      <ModalForm createStatus={createStatus} closeModal={closeModal} />
    </ReactModal>
  );
};

export default CreateBoardPageItemModal;
