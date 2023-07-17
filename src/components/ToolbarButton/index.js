import React from 'react';
import './ToolbarButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ToolbarButton({ triggerProps, icon, onClick }) {
  return (
    <FontAwesomeIcon
      {...triggerProps}
      className={`toolbar-button`}
      icon={icon}
      onClick={onClick}
    />
  );
}
