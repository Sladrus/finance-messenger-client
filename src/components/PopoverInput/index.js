import React from 'react';
import './PopoverInput.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, AnimatePresence } from 'framer-motion';

const PopoverInput = ({ icon, placeholder, value, onChange, onKeyPress }) => {
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
        onChange={onChange}
        onKeyDown={onKeyPress}
      />
    </motion.div>
  );
};

export default PopoverInput;
