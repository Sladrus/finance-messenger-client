import React from 'react';
import './ToolbarButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ToolbarButton({ icon, onClick }) {
  return (
    <FontAwesomeIcon
      className={`toolbar-button`}
      icon={icon}
      onClick={onClick}
    />
  );
}
