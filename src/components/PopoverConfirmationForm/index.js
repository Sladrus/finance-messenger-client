import React from 'react';
import './PopoverConfirmationForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import ModalButton from '../ModalButton';

const PopoverConfirmationForm = ({
  closeModal,
  modalValue,
  handleSendComment,
  user,
  selectedConversation,
}) => {
  console.log(modalValue);
  const text =
    modalValue.type === 'comment'
      ? `Добавить комментарий "${modalValue.value}?"`
      : ``;

  const submit = async () => {
    console.log('send message');
    if (modalValue.type === 'comment') {
      await handleSendComment({
        type: 'comment',
        text: modalValue.value,
        from: { id: 1274681231, first_name: user.username },
        selectedConversation: selectedConversation,
        isBot: false,
        unread: false,
        date: Date.now() / 1000,
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
