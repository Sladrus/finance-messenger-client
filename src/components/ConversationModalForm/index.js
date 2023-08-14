import React from 'react';
import './ConversationModalForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClose,
  faLink,
  faIdCard,
  faRefresh,
  faTasks,
  faDotCircle,
  faListDots,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment-timezone';

const ConversationModalForm = ({ closeModal, conversation, refreshLink }) => {
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
              {conversation?.link ? conversation?.link : 'Ссылка отсутствует'}
            </a>
          </span>
          <FontAwesomeIcon
            onClick={() => refreshLink(conversation.chat_id)}
            className="popover-confiramtion-form-icon"
            icon={faRefresh}
          />
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
        {conversation?.tasks?.length && (
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              justifyContent: 'space-between',
              margin: '0',
            }}
          >
            <span style={{ color: 'white' }}>Список задач:</span>
            {conversation?.tasks.map((task) => {
              const convertedDate = moment(task.endAt).format(
                'DD.MM.YY, HH:MM'
              );

              return (
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: '0',
                    borderBottom: '1px solid black',
                    borderColor: '#ccc',
                  }}
                >
                  <span
                    style={{
                      color: 'white',
                      fontSize: '14px',
                      padding: '5px 10px 0px 0px',
                    }}
                  >
                    {task.text}
                  </span>
                  <span
                    style={{
                      color: 'white',
                      fontSize: '14px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {convertedDate}
                  </span>
                </div>
              );
            })}
          </div>
        )}
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
