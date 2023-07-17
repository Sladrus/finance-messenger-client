import React from 'react';
import './ModalInput.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ModalInput = ({ icon, placeholder, value, onChange, onKeyPress }) => {
  return (
    <div className="modal-input">
      <FontAwesomeIcon className="modal-input-icon" icon={icon} />
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
