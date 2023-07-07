import React, { useEffect, useRef, useState } from 'react';
import './Compose.css';
import ToolbarButton from '../ToolbarButton';
import { faArrowRight, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Compose({ user, selectedConversation, sendMessage }) {
  const [text, setText] = useState('');
  const inputElement = useRef(null);
  useEffect(() => {
    inputElement.current.focus();
  }, [selectedConversation]);

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed) {
      sendMessage({
        user: user,
        text: text,
        selectedConversation: selectedConversation,
        type: 'text',
      });
      setText('');
    }
  };

  return (
    <form className="compose" onSubmit={handleSendMessage}>
      <ToolbarButton icon={faPlus} />
      <input
        type="text"
        ref={inputElement}
        value={text}
        onChange={handleChangeText}
        className="compose-input"
        placeholder="Write a message..."
      />
      {text && (
        <ToolbarButton icon={faArrowRight} onClick={handleSendMessage} />
      )}
      {/* {!text && <ToolbarButton icon={faPlus} />} */}
    </form>
  );
}
