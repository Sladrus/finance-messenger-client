import React from 'react';
import './SidebarButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SidebarButton = ({
  id,
  icon,
  text,
  selectedButton,
  handleSideButtonClick,
}) => {
  return (
    <div
      className={`${
        id === selectedButton ? 'selected-sidebar-button' : ''
      } sidebar-button`}
      onClick={() => handleSideButtonClick(id)}
    >
      <div className="sidebar-container">
        <FontAwesomeIcon className={`sidebar-icon`} icon={icon} />
      </div>
      <span>{text}</span>
    </div>
  );
};

export default SidebarButton;
