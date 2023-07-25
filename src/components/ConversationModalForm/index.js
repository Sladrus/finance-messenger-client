import React from 'react';
import './ConversationModalForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faLink, faIdCard } from '@fortawesome/free-solid-svg-icons';
import ModalButton from '../ModalButton';

const ConversationModalForm = ({ closeModal, conversation }) => {
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
          Информация о чате
        </span>
        <FontAwesomeIcon
          onClick={closeModal}
          className="popover-confiramtion-form-icon"
          icon={faClose}
        />
      </div>
      <div className="members-info">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            margin: '0',
          }}
        >
          <FontAwesomeIcon
            className="popover-confiramtion-form-icon"
            icon={faLink}
          />
          <span className="popover-confiramtion-form-content">
            <a
              style={{ color: 'white' }}
              href={conversation?.link}
              target="_blank"
            >
              {conversation?.link}
            </a>
          </span>
        </div>
        <div
          style={{
            width: '250px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            margin: '0',
          }}
        >
          <FontAwesomeIcon
            className="popover-confiramtion-form-icon"
            icon={faIdCard}
          />
          <span className="popover-confiramtion-form-content">
            Chat ID: {conversation.chat_id}
          </span>
        </div>
      </div>
      {/* <div className="popover-confiramtion-form-content"></div> */}
      {/* <div style={{ width: '100%', display: 'flex' }}>
        <ModalButton variant="simple">Да</ModalButton>
        <ModalButton variant="warning" onClick={closeModal}>
          Нет
        </ModalButton>
      </div> */}
    </div>
  );
};

export default ConversationModalForm;
