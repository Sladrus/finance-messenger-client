import React from 'react';
import './EmptyBoardPageContainer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const EmptyBoardPageContainer = ({ openModal }) => {
  return (
    <div className="empty-board-page-list-block">
      <div onClick={openModal} className="create-board">
        <FontAwesomeIcon className="add-icon" icon={faPlus} />
      </div>
      <span>Добавить новый статус</span>
    </div>
  );
};

export default EmptyBoardPageContainer;
