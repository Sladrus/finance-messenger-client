import React from 'react';
import './ModalButton.css';
const ModalButton = ({ variant = 'simple', children, onClick }) => {
  return (
    <div
      type="submit"
      onClick={onClick}
      className={`modal-button ${variant === 'simple' ? 'simple' : 'warning'}`}
    >
      {children}
    </div>
  );
};

export default ModalButton;
