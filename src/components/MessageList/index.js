import React, { useEffect, useRef, useState } from 'react';
import Compose from '../Compose';
import Message from '../Message';

import moment from 'moment';

import './MessageList.css';
import { ClipLoader } from 'react-spinners';

export default function MessageList({
  user,
  isLoading,
  selectedConversation,
  messages,
  sendMessage,
  readConversation,
  linkUserToConversation,
  conversations,
  statuses,
  sendComment,
  moneysend,
  managers,
  changeStage,
  changeUserToConversation,
  createTask,
  getConversations,
  tags,
  createTag,
  addTag,
  removeTag,
  conversation,
}) {
  const MY_USER_ID = user._id;

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  const renderMessages = () => {
    //TODO: Добавить различие сообщений по их типу
    let i = 0;
    let messageCount = messages?.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.from.id === MY_USER_ID;
      let currentMoment = moment(current.date);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(
          currentMoment.diff(previousMoment)
        );
        prevBySameAuthor = previous.author === current.from.id;

        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.from.id;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Следующее сообщение
      i += 1;
    }

    return tempMessages;
  };
  return (
    <div className="message-list-container">
      {selectedConversation !== 0 ? (
        <div className="message-list">
          <div className="content">
            <div className="message-container">{renderMessages()}</div>
          </div>
          <span ref={messagesEndRef}></span>
        </div>
      ) : (
        <div className="message-container-placeholder">
          <span>{`Привет, ${user?.username}, выбери чат, чтобы начать общение.`}</span>
        </div>
      )}
      {selectedConversation !== 0 && (
        <Compose
          user={user}
          selectedConversation={selectedConversation}
          sendMessage={sendMessage}
          readConversation={readConversation}
          linkUserToConversation={linkUserToConversation}
          conversations={conversations}
          statuses={statuses}
          sendComment={sendComment}
          moneysend={moneysend}
          managers={managers}
          changeStage={changeStage}
          changeUserToConversation={changeUserToConversation}
          createTask={createTask}
          getConversations={getConversations}
          tags={tags}
          createTag={createTag}
          addTag={addTag}
          removeTag={removeTag}
          conversation={conversation}
        />
      )}
    </div>
  );
}
