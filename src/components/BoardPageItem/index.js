import React from 'react';
import './BoardPageItem.css';
import '../Message/Message.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLink, faPlus } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment-timezone';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLayer } from 'react-laag';

const BoardPageItem = ({
  task,
  setSelectedConversation,
  linkUserToConversation,
  user,
  openModal,
  isEmpty,
  selectedConversation,
  managers,
}) => {
  const [showButton, setShowButton] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const handleLinkButton = async (user) => {
    await linkUserToConversation(task.chat_id, user);
    if (!task?.user) task.user = user;
    else task.user = null;
    close();
  };
  const handleMouseEnter = () => {
    setShowButton(true);
  };

  const handleMouseLeave = () => {
    setShowButton(false);
  };

  const navigate = useNavigate();
  const dateToFormat = moment
    .unix(
      task?.messages?.length
        ? task?.messages[task?.messages?.length - 1]?.date
        : moment(task?.createdAt).unix()
    )
    .utcOffset(180); // Здесь вы можете использовать любую дату, которую необходимо отформатировать
  const today = moment().utcOffset(180); // Получаем текущее время, чтобы определить, является ли дата сегодняшней
  const formattedDate = dateToFormat.isSame(today, 'day')
    ? dateToFormat.format('HH:mm')
    : dateToFormat.format('DD.MM.YY');

  const navigateToConversation = (chat_id) => {
    navigate('/messenger');
    setSelectedConversation(chat_id);
  };

  function close() {
    setOpen(false);
  }

  const { renderLayer, triggerProps, layerProps } = useLayer({
    isOpen,
    onOutsideClick: close, // close the menu when the user clicks outside
    onDisappear: close, // close the menu when the menu gets scrolled out of sight
    overflowContainer: false, // keep the menu positioned inside the container
    auto: true, // automatically find the best placement
    placement: 'top-start', // we prefer to place the menu "top-end"
    triggerOffset: 10, // keep some distance to the trigger
    containerOffset: 10, // give the menu some room to breath relative to the container
    arrowOffset: 0, // let the arrow have some room to breath also
  });
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => {
        !isEmpty && navigateToConversation(task.chat_id);
      }}
      className={'board-list-item'}
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
            <h1 className="board-title">{task?.title}</h1>
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
                {task?.messages?.length > 0
                  ? task?.messages[task?.messages?.length - 1].from
                      ?.first_name + ':'
                  : 'Group:'}
              </span>
              <p className="board-snippet">
                {task?.messages?.length > 0
                  ? task?.messages[task?.messages?.length - 1].type ===
                      'photo' ||
                    task?.messages[task?.messages?.length - 1].type ===
                      'document'
                    ? 'Photo/Document'
                    : task?.messages[task?.messages?.length - 1].text
                  : 'Вы вошли в чат'}
              </p>
            </div>
            {task?.unreadCount > 0 && (
              <div className="unread-conversation">{task?.unreadCount}</div>
            )}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        {task?.user && (
          <div className="board-user">
            <FontAwesomeIcon className="board-user-icon" icon={faUser} />
            <span>{task?.user?.username}</span>
          </div>
        )}
        {user?.role === 'ADMIN' && task?.user && showButton && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleLinkButton(user);
            }}
            className="take-button"
          >
            <FontAwesomeIcon
              style={task?.user && { color: '#73b9f3' }}
              className="take-button-icon"
              icon={faLink}
            />
          </div>
        )}
        {user?.role === 'ADMIN' && !task?.user && showButton && (
          <div
            onClick={(e) => !isEmpty && e.stopPropagation()}
            className="take-button"
          >
            <div>
              <FontAwesomeIcon
                {...triggerProps}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(!isOpen);
                }}
                className="take-button-icon"
                icon={faPlus}
              />
              {renderLayer(
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="toolbar-popover"
                      {...layerProps}
                    >
                      {managers?.map((item, index) => (
                        <div
                          onClick={() => handleLinkButton(item)}
                          key={index}
                          className="popover-input"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                          }}
                        >
                          <FontAwesomeIcon
                            className="popover-input-icon"
                            icon={faUser}
                          />
                          <span
                            style={{
                              color: 'white',
                              padding: '10px 10px',
                              fontSize: '14px',
                              width: '100%',
                            }}
                          >
                            {item.username}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardPageItem;
