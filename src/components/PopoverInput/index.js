import React, { useState } from 'react';
import './PopoverInput.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';

const PopoverInput = ({
  icon,
  placeholder,
  type,
  onSubmit,

}) => {
  const [value, setValue] = useState('');

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      // keyCode 13 corresponds to the Enter key
      onSubmit(value, type);
    }
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
    // setModalValue({ type: 'comment', value: e.target.value });
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="popover-input"
    >
      <FontAwesomeIcon className="popover-input-icon" icon={icon} />
      <input
        placeholder={placeholder}
        value={value}
        onChange={handleValueChange}
        onKeyDown={handleKeyPress}
      />
    </motion.div>
  );
};

export default PopoverInput;
