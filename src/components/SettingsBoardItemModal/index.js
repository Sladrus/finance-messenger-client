import React from 'react';
import './SettingsBoardItemModal.css';
import ReactModal from 'react-modal';
import ModalSettingsForm from '../ModalSettingsForm';

const SettingsBoardItemModal = ({
  status,
  modalIsOpen,
  closeModal,
  updateStage,
  deleteStage,
}) => {
  return (
    <ReactModal
      ariaHideApp={false}
      className="modal-item"
      overlayClassName="modal-overlay"
      isOpen={modalIsOpen}
      contentLabel="Example Modal"
    >
      <ModalSettingsForm
        status={status}
        closeModal={closeModal}
        updateStage={updateStage}
        deleteStage={deleteStage}
      />
    </ReactModal>
  );
};

export default SettingsBoardItemModal;
