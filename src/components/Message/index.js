import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import './Message.css';
import Avatar from 'react-avatar';
import ReplyButton from '../ReplyButton';
import ClipLoader from 'react-spinners/ClipLoader';
import env from 'react-dotenv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

function getColorById(id) {
  // Например, простейшее правило: каждый пользователь получает свой уникальный цвет
  const colors = [
    '#0095B6',
    '#C154C1',
    '#F34723',
    '#1560BD',
    '#34C999',
    '#FFDC33',
    '#20603D',
    '#82898F',
    '#497E76',
    '#2271B3',
    '#47402E',
    '#FFA420',
    '#008F39',
    '#025669',
    '#1E5945',
  ];
  const output = parseInt(id, 16) % Math.pow(10, 8);
  return colors[output % colors.length];
}

export default function Message({
  data,
  isMine,
  startsSequence,
  endsSequence,
}) {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [documentUrl, setDocumentUrl] = useState(null);

  const [isHovered, setIsHovered] = useState(false);
  const token = env.BOT_TOKEN;

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
    if (data.type === 'document') {
      console.log(data);
      // Запрос для получения ссылки на фото с помощью getFile
      fetch(
        `https://api.telegram.org/bot${token}/getFile?file_id=${data.document.file_id}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data.result);
          // URL-адрес фото находится в свойстве file_path объекта File
          const url = `https://api.telegram.org/file/bot${token}/${data.result.file_path}`;
          setDocumentUrl(url);
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
      {data?.type === 'event' && (
        <div
          className="bubble-container"
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <pre
            style={{
              fontSize: '14px',
              background: '#111f30',
              borderRadius: '20px',
              margin: '0',
              padding: '5px 15px',
              fontWeight: '600',
            }}
          >
            {data.text}
          </pre>

          {/* <div
            style={{
              display: 'flex',
            }}
            className="bubble-time"
          >
            <span>{formattedDate}</span>
          </div> */}
        </div>
      )}
      {data?.type === 'comment' && (
        <div
          className="bubble-container"
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <pre
            style={{
              fontSize: '14px',
              background: '#111f30',
              borderRadius: '20px',
              margin: '0',
              padding: '5px 15px',
              fontWeight: '600',
            }}
          >
            {data.text}
          </pre>

          {/* <div
            style={{
              display: 'flex',
            }}
            className="bubble-time"
          >
            <span>{formattedDate}</span>
          </div> */}
        </div>
      )}
      <div
        className="bubble-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {data?.type !== 'event' && data?.type !== 'comment' && !isMine && (
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
          <>
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
            {!isMine && data.unread && (
              <span className="bubble-unread">Новое сообщение</span>
            )}
          </>
        )}
        {data.type === 'document' && (
          <>
            <div className="bubble-document">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                {/* <div className="bubble-title">
                  {!isMine && (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span style={{ color }} className="bubble-name">
                        {data.from.first_name}
                      </span>
                    </div>
                  )}
                </div> */}
                {documentUrl && (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon
                      className="bubble-document-icon"
                      icon={faFile}
                    />
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                      }}
                    >
                      <a
                        href={documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {data.document.file_name}
                      </a>
                      <span>{data.document.file_size} B</span>
                    </div>
                  </div>
                )}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'end',
                  }}
                >
                  {data.text && <pre>{data.text}</pre>}
                  <span className="bubble-photo-time">{formattedDate}</span>
                </div>
              </div>
            </div>
            {!isMine && data.unread && (
              <span className="bubble-unread">Новое сообщение</span>
            )}
          </>
        )}
        {data.type === 'text' && (
          <>
            <div className="bubble">
              <div className="bubble-title">
                {!isMine && (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
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
      </div>
    </div>
  );
}
