import React from 'react';
import './PopoverConfirmationForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import ModalButton from '../ModalButton';

const PopoverConfirmationForm = ({
  closeModal,
  modalValue,
  handleSendMessage,
  user,
  selectedConversation,
}) => {
  console.log(modalValue);
  const text =
    modalValue.type === 'comment'
      ? `Добавить комментарий "${modalValue.value}?"`
      : ``;
  const submit = async () => {
    if (modalValue.type === 'comment') {
      await handleSendMessage({
        type: 'comment',
        text: modalValue.value,
        user: user,
        selectedConversation: selectedConversation,
        isBot: true,
      });
    }
    closeModal();
  };
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '15px 25px',
        }}
      >
        <span className="popover-confiramtion-form-title">
          Подтвердить изменения
        </span>
        <FontAwesomeIcon
          onClick={closeModal}
          className="popover-confiramtion-form-icon"
          icon={faClose}
        />
      </div>
      <div className="popover-confiramtion-form-content">{text}</div>
      <div style={{ width: '100%', display: 'flex' }}>
        <ModalButton variant="simple" onClick={submit}>
          Да
        </ModalButton>
        <ModalButton variant="warning" onClick={closeModal}>
          Нет
        </ModalButton>
      </div>
    </div>
  );
};

export default PopoverConfirmationForm;
