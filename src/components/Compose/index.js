import React, { useEffect, useRef, useState } from 'react';
import './Compose.css';
import ToolbarButton from '../ToolbarButton';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Compose({ selectedConversation, sendMessage }) {
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
        text: text,
        selectedConversation: selectedConversation,
        type: 'text',
      });
      setText('');
    }
  };

  return (
    <form className="compose" onSubmit={handleSendMessage}>
      <ToolbarButton icon={faPaperclip} />
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
    </form>
  );
}
