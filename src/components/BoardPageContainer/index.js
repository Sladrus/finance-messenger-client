import React from 'react';
import './BoardPageContainer.css';
import BoardPageItem from '../BoardPageItem';
import EmptyBoard from '../EmptyBoard';
import { faAngleLeft, faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableTaskItem from '../SortableTaskItem';

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
  id,
  status,
  tasks,
  setSelectedConversation,
  linkUserToConversation,
  user,
  isDragging,
}) => {
  const { setNodeRef } = useDroppable({
    id,
  });

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
          <span className="board-page-list-container-label">
            {status?.label}
          </span>
          <div>
            {!status?.default && (
              <FontAwesomeIcon className="take-button-icon" icon={faGear} />
            )}
            <FontAwesomeIcon
              style={{ paddingLeft: '10px' }}
              className="take-button-icon"
              icon={faAngleLeft}
            />
          </div>
        </div>
        <span>{`${tasks?.length} ${chatCount(tasks?.length)}`}</span>
        <div style={{ background: status?.color }} className="color-line"></div>
      </div>
      <div className="board-page-list-container">
        <SortableContext
          id={id}
          items={tasks || []}
          strategy={verticalListSortingStrategy}
        >
          <div ref={setNodeRef}>
            {tasks?.map((task) => (
              <div key={task?._id}>
                <SortableTaskItem id={task?._id}>
                  <BoardPageItem
                    task={task}
                    setSelectedConversation={setSelectedConversation}
                    linkUserToConversation={linkUserToConversation}
                    user={user}
                    isDraggin={isDragging}
                  />
                </SortableTaskItem>
              </div>
            ))}
          </div>
        </SortableContext>
        {!tasks?.length && <EmptyBoard />}
      </div>
    </div>
  );
};

export default BoardPageContainer;
