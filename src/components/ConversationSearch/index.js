import React, { useState } from 'react';
import './ConversationSearch.css';
import ToolbarButton from '../ToolbarButton';
import {
  faSearch,
  faXmark,
  faRightLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ConversationSearch({ isExpanded, setIsExpanded }) {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="conversation-search">
      <div className="conversation-search-input-container">
        <FontAwesomeIcon width={15} height={15} icon={faSearch} />
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className="conversation-search-input"
          placeholder="Search"
        />
        {value && <ToolbarButton icon={faXmark} />}
      </div>
      <div>
        <FontAwesomeIcon
          onClick={handleClick}
          className="conversation-expand-button"
          icon={faRightLeft}
        />
      </div>
    </div>
  );
}
