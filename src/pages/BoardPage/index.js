import React, { useRef, useState, useEffect } from 'react';
import './BoardPage.css';
import BoardPageContainer from '../../components/BoardPageContainer';
import EmptyBoardPageContainer from '../../components/EmptyBoardPageContainer';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TopBar from '../../components/TopBar';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  // console.log(source, destination);
  //TODO: тут говно
  // added check to ignore moving if item already exists
  if (!destClone.find((item) => item?._id === removed?._id)) {
    destClone.splice(droppableDestination.index, 0, removed);
  }

  const result = {};
  console.log(
    droppableSource.droppableId,
    droppableDestination.droppableId,
    source,
    destination
  );
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  // moveConversation(droppableSource.droppableId, droppableDestination.droppableId);
  return result;
};

const BoardPage = ({
  statuses,
  updateStatuses,
  setStatuses,
  setSelectedConversation,
  linkUserToConversation,
  user
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isAnimating) updateStatuses();
  }, [isAnimating]);

  const onDragStart = () => {
    setIsAnimating(true);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      setIsAnimating(false);
      return;
    }

    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const conversations = reorder(
        statuses[sInd].conversations,
        source.index,
        destination.index
      );
      const newState = [...statuses];
      newState[sInd] = { ...newState[sInd], conversations };
      setStatuses(newState);
      setIsAnimating(false);
    } else {
      const result = move(
        statuses[sInd].conversations,
        statuses[dInd].conversations,
        source,
        destination
      );
      const newState = [...statuses];
      newState[sInd] = { ...newState[sInd], conversations: result[sInd] };
      newState[dInd] = { ...newState[dInd], conversations: result[dInd] };

      setStatuses(
        newState.filter(
          (group) =>
            group?.conversations && !group?.conversations.includes(undefined)
        )
      );
      setIsAnimating(false);
    }
  };

  return (
    <div className="board-page">
      <TopBar />
      <div
        style={{
          height: 'calc(100% - 50px)',
        }}
      >
        <div className="board-page-list">
          <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            {statuses?.map((el, ind) => (
              <Droppable key={ind} droppableId={`${ind}`}>
                {(provided) => (
                  <BoardPageContainer
                    provided={provided}
                    el={el}
                    isAnimating={isAnimating}
                    setSelectedConversation={setSelectedConversation}
                    linkUserToConversation={linkUserToConversation}
                    user={user}
                  />
                )}
              </Droppable>
            ))}
          </DragDropContext>
          <EmptyBoardPageContainer />
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
