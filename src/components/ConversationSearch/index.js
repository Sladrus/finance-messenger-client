import React, { useState } from 'react';
import './ConversationSearch.css';
import ToolbarButton from '../ToolbarButton';
import {
  faSearch,
  faXmark,
  faRightLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ConversationSearch({
  isExpanded,
  setIsExpanded,
  searchInput,
  setSearchInput,
}) {
  const handleChange = (event) => {
    setSearchInput(event.target.value);
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
          value={searchInput}
          onChange={handleChange}
          className="conversation-search-input"
          placeholder="Search"
        />
        {searchInput && (
          <ToolbarButton onClick={() => setSearchInput('')} icon={faXmark} />
        )}
      </div>
    </div>
  );
}
