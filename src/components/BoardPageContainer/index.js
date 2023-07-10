import React, { useState } from 'react';
import './BoardPageContainer.css';
import BoardPageItem from '../BoardPageItem';
import { Draggable } from 'react-beautiful-dnd';
import EmptyBoard from '../EmptyBoard';
import {
  faAlignLeft,
  faAngleLeft,
  faArrowAltCircleLeft,
  faArrowCircleLeft,
  faArrowLeftLong,
  faArrowsLeftRightToLine,
  faCircleArrowLeft,
  faDeleteLeft,
  faGear,
  faLeftLong,
  faQuoteLeft,
  faTentArrowTurnLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function chatCount(num) {
  const lastDigit = num % 10;
  if (lastDigit === 1 && num !== 11) {
    return 'чат';
  } else if ([2, 3, 4].includes(lastDigit) && (num < 10 || num > 20)) {
    return 'чата';
  } else {
    return 'чатов';
  }
}

const BoardPageContainer = ({
  provided,
  el,
  isAnimating,
  setSelectedConversation,
  linkUserToConversation,
  user,
  openModal,
}) => {
  return (
    <div className="board-page-list-block">
      <div className="board-page-list-container-info">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span className="board-page-list-container-label">{el?.label}</span>
          <div>
            {!el.default && (
              <FontAwesomeIcon className="take-button-icon" icon={faGear} />
            )}
            <FontAwesomeIcon
              style={{ paddingLeft: '10px' }}
              className="take-button-icon"
              icon={faAngleLeft}
            />
          </div>
        </div>
        <span>
          {`${el?.conversations?.length} ${chatCount(
            el?.conversations?.length
          )}`}
        </span>
        <div style={{ background: el?.color }} className="color-line"></div>
      </div>
      <div
        className="board-page-list-container"
        ref={provided.innerRef}
        {...provided.droppableProps}
      >
        {el?.conversations?.map((item, index) => (
          <Draggable
            key={item?._id}
            draggableId={item?._id}
            index={index}
            isDragDisabled={isAnimating}
          >
            {(provided2) => (
              <BoardPageItem
                provided={provided2}
                item={item}
                setSelectedConversation={setSelectedConversation}
                linkUserToConversation={linkUserToConversation}
                user={user}
                openModal={openModal}
              />
            )}
          </Draggable>
        ))}
        {!el?.conversations?.length && <EmptyBoard />}
        {provided.placeholder}
      </div>
    </div>
  );
};

export default BoardPageContainer;
