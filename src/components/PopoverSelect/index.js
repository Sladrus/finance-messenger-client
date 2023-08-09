import React, { useState } from 'react';
import './PopoverSelect.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { color, motion } from 'framer-motion';
import Select, { StylesConfig } from 'react-select';
import ClipLoader from 'react-spinners/ClipLoader';

const PopoverSelect = ({
  icon,
  placeholder,
  onSubmit,
  isEnabled,
  options,
  conversation,
  defaultValue,
  isLoading,
}) => {
  const colourStyles = {
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
      margin: 0,
      padding: 0,
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      display: 'none', // Скрываем стрелку
      margin: 0,
      padding: 0,
    }),
    control: (provided) => ({
      ...provided,
      fontSize: '14px',
      fontWeight: '400',
      color: '#cccccc',
      border: 'none',
      boxShadow: 'none',
      backgroundColor: 'transparent',
      borderRadius: 0,
      margin: 0,
      padding: 0,
      appearance: 'none',
      width: '180px',
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: '14px',

      background: state.isSelected
        ? '#73b9f3'
        : state.isFocused
        ? '#F5F5F5'
        : 'transparent',
      color: state.isSelected ? '#FFFFFF' : '#000000',
      cursor: 'pointer',
    }),
    input: (styles) => ({
      ...styles,
      color: 'white',
      border: 'none',
      width: '100%',
      padding: '0',
      margin: '0',
    }),
    placeholder: (styles) => ({
      ...styles,
      color: 'white',
      border: 'none',
      fontSize: '14px',
      fontWeight: '400',
      color: '#cccccc',
    }),
    singleValue: (styles, { data }) => ({
      ...styles,
      color: 'white',
      border: 'none',
      width: '100%',
      fontSize: '14px',
      fontWeight: '400',
      color: '#cccccc',
    }),
    valueContainer: (styles, { data }) => ({
      ...styles,
      color: 'white',
      border: 'none',
      width: '100%',
      padding: '0',
      margin: '0',
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`popover-button ${isEnabled ? 'enabled' : 'disabled'}`}
    >
      {!isLoading ? (
        <FontAwesomeIcon
          style={{
            color: conversation?.stage?.color,
            paddingRight: '13px',
          }}
          className={`popover-button-icon ${
            isEnabled ? 'enabled' : 'disabled'
          }`}
          icon={icon}
        />
      ) : (
        <div
          style={{
            color: conversation?.stage?.color,
            padding: '0px 16px',
          }}
        >
          <ClipLoader
            color={'#729bbd'}
            loading={isLoading}
            size={12}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <Select
        menuPlacement="top"
        onChange={(e) => {
          onSubmit(e);
          // setIsLoading(false);
        }}
        defaultValue={defaultValue}
        options={options}
        styles={colourStyles}
      />
    </motion.div>
  );
};

export default PopoverSelect;
