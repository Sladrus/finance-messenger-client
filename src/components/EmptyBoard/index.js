import React from 'react';
import './EmptyBoard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowPointer } from '@fortawesome/free-solid-svg-icons';
import ClipLoader from 'react-spinners/ClipLoader';

const EmptyBoard = ({ status }) => {
  return (
    <div className="empty-board">
      {status.conversations ? (
        <>
          <FontAwesomeIcon className="empty-board-icon" icon={faArrowPointer} />
          <span>
            Перетащите существующий чат сюда, чтобы изменить его статус
          </span>
        </>
      ) : (
        <ClipLoader
          color={'#729bbd'}
          loading={true}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </div>
  );
};

export default EmptyBoard;
