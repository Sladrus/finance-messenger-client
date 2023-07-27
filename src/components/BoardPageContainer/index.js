import React, { useState } from 'react';
import './BoardPageContainer.css';
import BoardPageItem from '../BoardPageItem';
import EmptyBoard from '../EmptyBoard';
import {
  faAngleLeft,
  faAngleRight,
  faGear,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableTaskItem from '../SortableTaskItem';
import SettingsBoardItemModal from '../SettingsBoardItemModal';

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
  selectedConversation,
  linkUserToConversation,
  user,
  isDragging,
  updateStage,
  deleteStage,
  managers,
  moveStatus,
}) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  const [settingsBoardModalisOpen, setSettingsBoardModalIsOpen] =
    useState(false);

  const openSettingsBoardModal = () => {
    setSettingsBoardModalIsOpen(true);
  };
  const closeSettingsBoardModal = () => {
    setSettingsBoardModalIsOpen(false);
  };

  const handleMove = async (position, value) => {
    await moveStatus(position, value);
  };

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
            {!status?.default && user?.role === 'ADMIN' && (
              <FontAwesomeIcon
                onClick={openSettingsBoardModal}
                className="take-button-icon"
                icon={faGear}
              />
            )}
          </div>
        </div>
        <span>{`${tasks?.length} ${chatCount(tasks?.length)}`}</span>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <FontAwesomeIcon
            style={{ paddingLeft: '0', paddingRight: '15px' }}
            className="take-button-icon"
            icon={faAngleLeft}
            onClick={() => moveStatus(status.position - 1, status.value)}
          />
          <div
            style={{ background: status?.color }}
            className="color-line"
          ></div>
          <FontAwesomeIcon
            style={{ paddingLeft: '15px', paddingRight: '0' }}
            className="take-button-icon"
            icon={faAngleRight}
            onClick={() => moveStatus(status.position + 1, status.value)}
          />
        </div>
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
                    selectedConversation={selectedConversation}
                    managers={managers}
                  />
                </SortableTaskItem>
              </div>
            ))}
          </div>
        </SortableContext>
        {!tasks?.length && <EmptyBoard />}
      </div>
      <SettingsBoardItemModal
        status={status}
        modalIsOpen={settingsBoardModalisOpen}
        closeModal={closeSettingsBoardModal}
        updateStage={updateStage}
        deleteStage={deleteStage}
      />
    </div>
  );
};

export default BoardPageContainer;
