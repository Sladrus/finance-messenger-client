import React from 'react';
import './NotificationItem.css';
import { useNavigate } from 'react-router-dom';

const NotificationItem = ({ t, message }) => {
  return (
    <div className={'notification-list-item'}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <img
          className="notification-photo"
          src={
            'https://store-images.s-microsoft.com/image/apps.12376.13537716651231321.3067a421-6c2f-48a9-b77c-1e38e19146e6.f539b24d-6328-4c00-9469-2d6d841667e6'
          }
          alt="notification"
        />
        <div className="notification-info">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <h1 className="notification-title">{message.chat.title}</h1>
            <div className="notification-time">{'date'}</div>
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
              <span className="notification-snippet-name">
                {message.from.first_name}
              </span>
              <p className="notification-snippet">{message.text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
