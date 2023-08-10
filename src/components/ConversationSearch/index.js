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
  searchLoading,
  setSearchLoading,
  setCurrentPage,
}) {
  const handleChange = (event) => {
    setSearchInput(event.target.value);
    setSearchLoading(true);
    setCurrentPage(1);
  };

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    setCurrentPage(1);
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
          <ToolbarButton
            onClick={() => {
              setSearchInput('');
              setSearchLoading(true);
            }}
            icon={faXmark}
          />
        )}
      </div>
    </div>
  );
}
