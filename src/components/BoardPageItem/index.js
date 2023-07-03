import React from 'react';
import './BoardPageItem.css';
import '../Message/Message.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment-timezone';
const BoardPageItem = ({ provided, item }) => {
  const dateToFormat = moment
    .unix(
      item?.messages?.length
        ? item?.messages[item?.messages?.length - 1]?.date
        : item.createdAt
    )
    .utcOffset(180); // Здесь вы можете использовать любую дату, которую необходимо отформатировать
  const today = moment().utcOffset(180); // Получаем текущее время, чтобы определить, является ли дата сегодняшней
  const formattedDate = dateToFormat.isSame(today, 'day')
    ? dateToFormat.format('hh:mm')
    : dateToFormat.format('DD.MM.YY');
  return (
    <div
      className={'board-list-item'}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <img
          className="board-photo"
          src={
            'https://store-images.s-microsoft.com/image/apps.12376.13537716651231321.3067a421-6c2f-48a9-b77c-1e38e19146e6.f539b24d-6328-4c00-9469-2d6d841667e6'
          }
          alt="board"
        />
        <div className="board-info">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <h1 className="board-title">{item.title}</h1>
            <div className="board-time">{formattedDate}</div>
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
                paddingTop: '2px',
              }}
            >
              <span className="board-snippet-name">
                {item.messages?.length > 0
                  ? item.messages[item.messages?.length - 1].from?.first_name +
                    ':'
                  : 'Group:'}
              </span>
              <p className="board-snippet">
                {item.messages?.length > 0
                  ? item.messages[item.messages?.length - 1].type === 'text'
                    ? item.messages[item.messages?.length - 1].text
                    : 'Photo'
                  : 'Вы вошли в чат'}
              </p>
            </div>
            {item.unreadCount > 0 && (
              <div className="unread-conversation">{item.unreadCount}</div>
            )}
          </div>
        </div>
      </div>
      {item?.user && (
        <div className="board-user">
          <FontAwesomeIcon className="board-user-icon" icon={faUser} />
          <span>{item?.user}</span>
        </div>
      )}
    </div>
  );
};

export default BoardPageItem;
