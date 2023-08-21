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
  dateRange,
  setConversation,
}) => {
  const [boardSections, setBoardSections] = useState([]);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [createBoardModalIsOpen, createBoardSetIsOpen] = useState(false);

  useEffect(() => {
    const filteredStages = statuses
      .filter((stage) => {
        return filter?.stage ? stage.value === filter?.stage : true;
      })
      .map((stage) => {
        const filteredConversations = stage?.conversations
          ?.filter((conversation) => {
            return filter?.user === ''
              ? true
              : filter?.user === null
              ? !conversation?.user?._id
              : conversation?.user?._id === filter?.user;
          })
          .filter((conversation) => {
            const unread = conversation?.unreadCount > 0 ? true : false;
            return filter?.unread !== '' ? unread === filter?.unread : true;
          })
          .filter((conversation) => {
            const conversationDate = new Date(conversation?.workAt);
            const startDate = new Date(dateRange[0].startDate);
            const conversationDay = new Date(conversationDate).getDate();
            const startDay = new Date(startDate).getDate();
            const endDate = new Date(dateRange[0].endDate);
            return (
              (conversationDate >= startDate && conversationDate <= endDate) ||
              startDay === conversationDay
            );
          })
          .filter((conversation) => {
            // console.log(filter);

            return filter?.task === ''
              ? true
              : filter?.task === null
              ? conversation?.tasks?.length === 0
              : conversation?.tasks?.some((task) => {
                  if (filter?.task === 'today') {
                    // Фильтровать задачи, у которых крайний срок сегодня
                    const today = new Date().setHours(0, 0, 0, 0);
                    const deadline = new Date(task?.endAt).setHours(0, 0, 0, 0);
                    return deadline === today;
                  }
                  if (filter?.task === 'tomorrow') {
                    // Фильтровать задачи, у которых крайний срок завтра
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    tomorrow.setHours(0, 0, 0, 0);
                    const tomorrowDeadline = new Date(task?.endAt).setHours(
                      0,
                      0,
                      0,
                      0
                    );
                    return tomorrowDeadline === tomorrow.getTime();
                  }
                  if (filter?.task === 'late') {
                    // Фильтровать просроченные задачи
                    const todayDate = new Date().setHours(0, 0, 0, 0);
                    const taskDeadline = new Date(task?.endAt).setHours(
                      0,
                      0,
                      0,
                      0
                    );
                    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
                    if ((todayDate - taskDeadline) / oneDayInMilliseconds > 1) {
                      return false;
                    }
                    return taskDeadline < todayDate;
                  }
                  if (filter?.task === 'done') {
                    // Фильтровать выполненные задачи
                    return task?.done;
                  }
                  return true; // Возвращать все разговоры по умолчанию
                });
          });

        return { ...stage, conversations: filteredConversations };
      });
    setBoardSections(initializeBoard(filteredStages));
  }, [statuses, dateRange, filter]);

  const sensors = useSensors(
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor),
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200,
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

  // console.log(statuses);
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
                  setConversation={setConversation}
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
