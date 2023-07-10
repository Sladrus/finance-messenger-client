import React from 'react';
import './ModalInput.css';

const ModalInput = ({ placeholder, value, onChange, onKeyPress }) => {
  return (
    <div className="modal-input">
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyPress}
      />
    </div>
  );
};

export default ModalInput;
