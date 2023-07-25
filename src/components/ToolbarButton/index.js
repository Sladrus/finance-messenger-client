import React from 'react';
import './ToolbarButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ToolbarButton({
  triggerProps,
  triggerProps2,
  icon,
  onClick,
}) {
  return (
    <FontAwesomeIcon
      {...triggerProps}
      {...triggerProps2}
      className={`toolbar-button`}
      icon={icon}
      onClick={onClick}
    />
  );
}
