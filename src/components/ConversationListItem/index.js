import React, { useEffect, useRef, useState } from 'react';

import './ConversationListItem.css';
import StatusSelect from '../StatusSelect';
import moment from 'moment-timezone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLink } from '@fortawesome/free-solid-svg-icons';

export default function ConversationListItem({
  selectedConversation,
  statuses,
  handleButtonClick,
  data,
  changeStage,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  const dateToFormat = moment
    .unix(
      data?.messages?.length
        ? data?.messages[data?.messages?.length - 1]?.date
        : moment(data.createdAt).unix()
    )
    .utcOffset(180); // Здесь вы можете использовать любую дату, которую необходимо отформатировать
  const today = moment().utcOffset(180); // Получаем текущее время, чтобы определить, является ли дата сегодняшней
  const formattedDate = dateToFormat.isSame(today, 'day')
    ? dateToFormat.format('HH:mm')
    : dateToFormat.format('DD.MM.YY');

  useEffect(() => {
    const checkWidth = () => {
      const containerWidth = elementRef.current?.offsetWidth;
      if (containerWidth > 344) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    const observer = new ResizeObserver(checkWidth);
    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [elementRef]);
  return (
    <div
      ref={elementRef}
      className={
        selectedConversation === data.chat_id
          ? 'selected-conversation-list-item'
          : 'conversation-list-item'
      }
      onClick={() => handleButtonClick(data.chat_id)}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'start',
          width: '350px',
          paddingRight: '25px',
        }}
      >
        <img
          className="conversation-photo"
          src={
            'https://store-images.s-microsoft.com/image/apps.12376.13537716651231321.3067a421-6c2f-48a9-b77c-1e38e19146e6.f539b24d-6328-4c00-9469-2d6d841667e6'
          }
          alt="conversation"
        />
        <div className="conversation-info">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: data.stage.color }} className="status-dot">
                &#8226;
              </span>
              <h1 className="conversation-title">{data.title}</h1>
            </div>

            <div className="conversation-time">{formattedDate}</div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '14px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '220px',
                paddingTop: '5px',
              }}
            >
              <span className="conversation-snippet-name">
                {data.messages?.length > 0
                  ? data.messages[data.messages?.length - 1].from.first_name +
                    ':'
                  : 'Group:'}
              </span>
              <p className="conversation-snippet">
                {data.messages?.length > 0
                  ? data.messages[data.messages?.length - 1].type === 'text'
                    ? data.messages[data.messages?.length - 1].text
                    : 'Photo'
                  : 'Вы вошли в чат'}
              </p>
            </div>
            {/* //TODO: ДОБАВИТЬ СЧЕТЧИК НЕПРОЧИТАННЫХ СООБЩЕНИЙ */}
            {data.unreadCount > 0 && (
              <div className="unread-conversation">{data.unreadCount}</div>
            )}
          </div>
          {/* <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'end',
            }}
          >
            {data?.user && (
              <div className="board-user">
                <FontAwesomeIcon className="board-user-icon" icon={faUser} />
                <span>{data?.user.username}</span>
              </div>
            )}
            {
              <div className="take-button">
                <FontAwesomeIcon
                  style={data?.user && { color: '#73b9f3' }}
                  className="take-button-icon"
                  icon={faLink}
                />
              </div>
            }
          </div> */}
        </div>
      </div>
      {isVisible && (
        <div className="conversation-status">
          <StatusSelect
            statuses={statuses}
            data={data}
            changeStage={changeStage}
          />
        </div>
      )}
    </div>
  );
}
