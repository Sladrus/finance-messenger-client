import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import './Message.css';
import Avatar from 'react-avatar';
import ReplyButton from '../ReplyButton';
import ClipLoader from 'react-spinners/ClipLoader';

function getColorById(id) {
  // Например, простейшее правило: каждый пользователь получает свой уникальный цвет
  const colors = [
    '#0095B6',
    '#C154C1',
    '#F34723',
    '#1560BD',
    '#34C924',
    '#FFDC33',
  ];

  return colors[id % colors.length];
}

export default function Message({
  data,
  isMine,
  startsSequence,
  endsSequence,
}) {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const token = '5986400520:AAHd61GLW0C2TXQpSAtS4FSVkNvPWGn0MM0';

  useEffect(() => {
    if (data.type === 'photo') {
      // Запрос для получения ссылки на фото с помощью getFile
      fetch(
        `https://api.telegram.org/bot${token}/getFile?file_id=${data.photo[2].file_id}`
      )
        .then((response) => response.json())
        .then((data) => {
          // URL-адрес фото находится в свойстве file_path объекта File
          const url = `https://api.telegram.org/file/bot${token}/${data.result.file_path}`;
          setPhotoUrl(url);
        });
    }
  }, []);
  const color = getColorById(data.from.id);

  const dateToFormat = moment.unix(data.date).utcOffset(180); // Здесь вы можете использовать любую дату, которую необходимо отформатировать
  const today = moment().utcOffset(180); // Получаем текущее время, чтобы определить, является ли дата сегодняшней
  const formattedDate = dateToFormat.isSame(today, 'day')
    ? dateToFormat.format('hh:mm')
    : dateToFormat.format('hh:mm DD.MM');
  return (
    <div
      className={[
        'message',
        `${isMine ? 'mine' : ''}`,
        `${startsSequence ? 'start' : ''}`,
        `${endsSequence ? 'end' : ''}`,
      ].join(' ')}
    >
      <div
        className="bubble-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {!isMine && (
          <div className="bubble-avatar">
            {endsSequence && (
              <Avatar
                color={color}
                size="35"
                round={true}
                name={data.from.first_name}
              />
            )}
          </div>
        )}
        {isMine && isHovered && <ReplyButton />}
        {data.type === 'photo' && (
          <div className="bubble-photo">
            <img
              className="message-photo"
              src={photoUrl}
              alt={photoUrl}
              // onClick={handleClickPhoto}
            />
            {data.text && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <pre>{data.text}</pre>
                <div className="bubble-photo-time">{formattedDate}</div>
              </div>
            )}
          </div>
        )}
        {data.type === 'text' && (
          <>
            <div className="bubble">
              <div className="bubble-title">
                {!isMine && (
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <span style={{ color }} className="bubble-name">
                      {data.from.first_name}
                    </span>
                  </div>
                )}

                <pre>{data.text}</pre>
              </div>

              <div
                style={{
                  display: 'flex',
                }}
                className="bubble-time"
              >
                {!data?.loading ? (
                  <span>{formattedDate}</span>
                ) : (
                  <ClipLoader
                    color={'#729bbd'}
                    loading={data?.loading}
                    size={15}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                )}
              </div>
            </div>
            {!isMine && data.unread && (
              <span className="bubble-unread">Новое сообщение</span>
            )}
          </>
        )}
        {!isMine && isHovered && <ReplyButton />}
      </div>
    </div>
  );
}
