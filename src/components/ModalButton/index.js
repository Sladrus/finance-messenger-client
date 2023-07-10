import React from 'react';
import './ModalButton.css';
const ModalButton = ({ children, onClick }) => {
  return (
    <div type="submit" onClick={onClick} className="modal-button">
      {children}
    </div>
  );
};

export default ModalButton;
