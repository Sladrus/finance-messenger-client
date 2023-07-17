import React, { useEffect, useRef, useState } from 'react';
import { useLayer, Arrow } from 'react-laag';
import { motion, AnimatePresence } from 'framer-motion';
import './Compose.css';
import ToolbarButton from '../ToolbarButton';
import {
  faArrowRight,
  faPlus,
  faComment,
  faPhotoVideo,
  faTag,
  faTags,
  faFile,
  faToggleOff,
  faLink,
  faTasks,
  faDollar,
  faChartLine,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import 'react-dropdown/style.css';
import PopoverInput from '../PopoverInput';

export default function Compose({ user, selectedConversation, sendMessage }) {
  const [text, setText] = useState('');
  const [isOpen, setOpen] = useState(false);

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

  function close() {
    setOpen(false);
  }

  const { renderLayer, triggerProps, layerProps } = useLayer({
    isOpen,
    onOutsideClick: close, // close the menu when the user clicks outside
    onDisappear: close, // close the menu when the menu gets scrolled out of sight
    overflowContainer: true, // keep the menu positioned inside the container
    auto: false, // automatically find the best placement
    placement: 'top-start', // we prefer to place the menu "top-end"
    triggerOffset: 20, // keep some distance to the trigger
    containerOffset: 20, // give the menu some room to breath relative to the container
    arrowOffset: 0, // let the arrow have some room to breath also
  });

  return (
    <form className="compose" onSubmit={handleSendMessage}>
      <div>
        <ToolbarButton
          icon={faPlus}
          triggerProps={triggerProps}
          onClick={() => setOpen(!isOpen)}
        />
        {renderLayer(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="toolbar-popover"
                {...layerProps}
              >
                <PopoverInput
                  icon={faCheck}
                  placeholder={'Прочитано'}
                  // onChange={handleStatus}
                  // value={label}
                  // onKeyPress={handleKeyPress}
                />
                <PopoverInput
                  icon={faChartLine}
                  placeholder={'Курсы валют'}
                  // onChange={handleStatus}
                  // value={label}
                  // onKeyPress={handleKeyPress}
                />
                <PopoverInput
                  icon={faDollar}
                  placeholder={'Баланс'}
                  // onChange={handleStatus}
                  // value={label}
                  // onKeyPress={handleKeyPress}
                />
                <PopoverInput
                  icon={faLink}
                  placeholder={'Закрепить'}
                  // onChange={handleStatus}
                  // value={label}
                  // onKeyPress={handleKeyPress}
                />

                <PopoverInput
                  icon={faToggleOff}
                  placeholder={'Активировать'}
                  // onChange={handleStatus}
                  // value={label}
                  // onKeyPress={handleKeyPress}
                />
                <PopoverInput
                  icon={faTasks}
                  placeholder={'Задача'}
                  // onChange={handleStatus}
                  // value={label}
                  // onKeyPress={handleKeyPress}
                />
                <PopoverInput
                  icon={faTag}
                  placeholder={'Статус'}
                  // onChange={handleStatus}
                  // value={label}
                  // onKeyPress={handleKeyPress}
                />
                <PopoverInput
                  icon={faTags}
                  placeholder={'Тэги'}
                  // onChange={handleStatus}
                  // value={label}
                  // onKeyPress={handleKeyPress}
                />
                <PopoverInput
                  icon={faComment}
                  placeholder={'Комментарий'}
                  // onChange={handleStatus}
                  // value={label}
                  // onKeyPress={handleKeyPress}
                />
                <PopoverInput
                  icon={faPhotoVideo}
                  placeholder={'Фото или видео'}
                  // onChange={handleStatus}
                  // value={label}
                  // onKeyPress={handleKeyPress}
                />
                <PopoverInput
                  icon={faFile}
                  placeholder={'Документ'}
                  // onChange={handleStatus}
                  // value={label}
                  // onKeyPress={handleKeyPress}
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

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
