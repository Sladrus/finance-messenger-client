import React, { useRef, useState, useEffect } from 'react';
import './BoardPage.css';
import BoardPageContainer from '../../components/BoardPageContainer';
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DndContext,
  closestCorners,
  DragOverlay,
  defaultDropAnimation,
  MouseSensor,
  TouchSensor,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';
import BoardPageItem from '../../components/BoardPageItem';
// import BoardPageContainer from '../../components/BoardPageContainer';
import EmptyBoardPageContainer from '../../components/EmptyBoardPageContainer';
import ReactModal from 'react-modal';
import CreateBoardPageItemModal from '../../components/CreateBoardPageItemModal';

export const getTasksByStatus = (tasks, status) => {
  return tasks.filter((task) => task.stage.value === status.value);
};

export const initializeBoard = (statuses) => {
  const boardSections = {};

  statuses.forEach((boardSectionKey) => {
    boardSections[boardSectionKey.value] = boardSectionKey.conversations;
  });
  return boardSections;
};

export const findBoardSectionContainer = (boardSections, id) => {
  if (id in boardSections) {
    return id;
  }

  const container = Object.keys(boardSections).find((key) =>
    boardSections[key].find((item) => item._id === id)
  );
  return container;
};

export const getTaskById = (statuses, id) => {
  const foundTask = statuses.find((status) => {
    const foundConversation = status.conversations.find(
      (conversation) => conversation._id === id
    );
    return foundConversation;
  });

  return foundTask?.conversations.find(
    (conversation) => conversation._id === id
  );
};

const BoardPage = ({
  statuses,
  updateStage,
  setSelectedConversation,
  linkUserToConversation,
  user,
  filter,
  setFilter,
  createStatus,
  changeStage,
  getStages,
  deleteStage,
  selectedConversation,
  managers,
  moveStatus,
}) => {
  const [boardSections, setBoardSections] = useState(initializeBoard(statuses));
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const [createBoardModalIsOpen, createBoardSetIsOpen] = useState(false);
  useEffect(() => {
    setBoardSections(initializeBoard(statuses));
  }, [statuses]);

  const sensors = useSensors(
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor),
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 230,
        tolerance: 500,
      },
      pointer: true,
    })
  );

  const createBoardOpenModal = (e) => {
    console.log('OPEN MODAL');
    createBoardSetIsOpen(true);
  };

  const createBoardCloseModal = (e) => {
    console.log('CLOSE MODAL');
    createBoardSetIsOpen(false);
  };

  const handleDragStart = ({ active }) => {
    // console.log(active);
    setActiveTaskId(active.id);
    setIsDragging(true);
  };

  const handleDragOver = ({ active, over }) => {
    // Найти контейнеры
    const activeContainer = findBoardSectionContainer(boardSections, active.id);
    const overContainer = findBoardSectionContainer(boardSections, over?.id);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setBoardSections((prevBoardSections) => {
      const newBoardSections = { ...prevBoardSections };

      const activeContainer = findBoardSectionContainer(
        boardSections,
        active.id
      );
      const overContainer = findBoardSectionContainer(boardSections, over?.id);

      if (
        !activeContainer ||
        !overContainer ||
        activeContainer === overContainer
      ) {
        return prevBoardSections;
      }

      const activeItems = [...newBoardSections[activeContainer]];
      const overItems = [...newBoardSections[overContainer]];

      const activeIndex = activeItems.findIndex(
        (item) => item._id === active.id
      );

      // Удалить активный элемент из исходного столбца
      activeItems.splice(activeIndex, 1);

      // Вставить активный элемент в новый столбец
      if (overItems.length === 0) {
        overItems.push(prevBoardSections[activeContainer][activeIndex]);
      } else {
        overItems.splice(
          overItems.length,
          0,
          prevBoardSections[activeContainer][activeIndex]
        );
      }

      newBoardSections[activeContainer] = activeItems;
      newBoardSections[overContainer] = overItems;

      return newBoardSections;
    });
    // changeStage(, activeContainer);
    // console.log(activeContainer, overContainer);
  };

  const handleDragEnd = ({ active, over }) => {
    const activeContainer = findBoardSectionContainer(boardSections, active.id);
    const overContainer = findBoardSectionContainer(boardSections, over?.id);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return setIsDragging(false);
    }

    const activeIndex = boardSections[activeContainer].findIndex(
      (task) => task._id === active.id
    );
    const overIndex = boardSections[overContainer].findIndex(
      (task) => task._id === over?.id
    );

    if (activeIndex !== overIndex) {
      setBoardSections((boardSection) => ({
        ...boardSection,
        [overContainer]: arrayMove(
          boardSection[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }
    console.log(activeIndex, overIndex);

    changeStage(
      boardSections[activeContainer][activeIndex]._id,
      activeContainer,
      overIndex
    );

    setActiveTaskId(null);
    setIsDragging(false);
  };

  const dropAnimation = {
    ...defaultDropAnimation,
  };

  const task = activeTaskId ? getTaskById(statuses, activeTaskId) : null;

  return (
    <div className="board-page">
      <div
        style={{
          height: '100%',
        }}
      >
        <div className="board-page-list">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            {Object.keys(boardSections).map((boardSectionKey) => {
              return (
                <BoardPageContainer
                  key={boardSectionKey}
                  id={boardSectionKey}
                  status={statuses.find((o) => o.value === boardSectionKey)}
                  tasks={boardSections[boardSectionKey]}
                  setSelectedConversation={setSelectedConversation}
                  selectedConversation={selectedConversation}
                  linkUserToConversation={linkUserToConversation}
                  user={user}
                  isDragging={isDragging}
                  isEmpty={false}
                  updateStage={updateStage}
                  deleteStage={deleteStage}
                  managers={managers}
                  moveStatus={moveStatus}
                />
              );
            })}
            <DragOverlay dropAnimation={dropAnimation}>
              {task ? <BoardPageItem task={task} isEmpty /> : null}
            </DragOverlay>
          </DndContext>
          {user?.role === 'ADMIN' && (
            <EmptyBoardPageContainer openModal={createBoardOpenModal} />
          )}
        </div>
      </div>
      <CreateBoardPageItemModal
        modalIsOpen={createBoardModalIsOpen}
        closeModal={createBoardCloseModal}
        createStatus={createStatus}
      />
    </div>
  );
};

export default BoardPage;
