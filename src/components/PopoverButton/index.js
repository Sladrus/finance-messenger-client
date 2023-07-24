import React from 'react';
import './PopoverButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, AnimatePresence } from 'framer-motion';

const PopoverButton = ({ icon, placeholder, onClick, isEnabled }) => {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`popover-button ${isEnabled ? 'enabled' : 'disabled'}`}
    >
      <FontAwesomeIcon
        className={`popover-button-icon ${isEnabled ? 'enabled' : 'disabled'}`}
        icon={icon}
      />
      <span>{placeholder}</span>
    </motion.div>
  );
};

export default PopoverButton;
