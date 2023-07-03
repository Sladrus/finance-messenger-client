import React from 'react';
import './TopBarButton.css';

import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TopBarButton = ({ children }) => {
  return (
    <div className="top-bar-button">
      <span>{children}</span>
      <FontAwesomeIcon className="top-bar-button-icon" icon={faCaretDown} />
    </div>
  );
};

export default TopBarButton;
