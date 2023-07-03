import React from 'react';
import './EmptyBoard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowPointer } from '@fortawesome/free-solid-svg-icons';

const EmptyBoard = () => {
  return (
    <div className="empty-board">
      <FontAwesomeIcon className="empty-board-icon" icon={faArrowPointer} />
      <span>Перетащите существующий чат сюда, чтобы изменить его статус</span>
    </div>
  );
};

export default EmptyBoard;
