import React from 'react';
import './TopBarButton.css';

import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TopBarButton = ({ children }) => {
  return (
    <div className="top-bar-button">
      <span>
        {children}
      </span>
    </div>
  );
};

export default TopBarButton;
