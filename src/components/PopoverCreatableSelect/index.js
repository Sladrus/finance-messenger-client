import React, { useState } from 'react';

import CreatableSelect from 'react-select/creatable';
import { color, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ClipLoader } from 'react-spinners';
import { useEffect } from 'react';

const PopoverCreatableSelect = ({
  icon,
  isEnabled,
  placeholder,
  options,
  onCreate,
  values,
  onChange,
}) => {
  console.log(values);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState([]);
  const [prevValue, setPrevValue] = useState([]);

  useEffect(() => {
    setPrevValue(values);
    setValue(values);
    setIsLoading(false);
  }, [values]);

  const handleCreate = (inputValue) => {
    console.log(inputValue);
    onCreate(inputValue);
  };

  const colourStyles = {
    indicatorsContainer: (provided) => ({
      display: 'none',
      margin: 0,
      padding: 0,
    }),
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
      minWidth: '250px',
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
      whiteSpace: 'nowrap',
      width: '100%',
    }),
    input: (styles) => ({
      ...styles,
      color: '#ccc',
      border: 'none',
      width: '100%',
      padding: '5px 4px',
      margin: '0',
    }),
    placeholder: (styles) => ({
      ...styles,
      border: 'none',
      fontSize: '14px',
      fontWeight: '400',
      color: '#cccccc',
    }),
    singleValue: (styles, { data }) => ({
      ...styles,
      border: 'none',
      width: '100%',
      fontSize: '14px',
      fontWeight: '400',
      color: '#cccccc',
    }),
    valueContainer: (styles, { data }) => ({
      ...styles,
      color: '#cccccc',
      border: 'none',
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
      <CreatableSelect
        isMulti
        backspaceRemovesValue={false}
        placeholder={placeholder}
        menuPlacement="top"
        isDisabled={isLoading}
        isLoading={isLoading}
        onChange={(newValue) => {
          setValue(newValue);
          // Проверяем, какие элементы были добавлены
          const addedItems = newValue.filter(
            (item) =>
              !prevValue.some((prevItem) => prevItem.value === item.value)
          );

          const removedItems = prevValue.filter(
            (prevItem) =>
              !newValue.some((item) => item.value === prevItem.value)
          );
          setPrevValue(newValue);
          onChange({ addedItems, removedItems });
          setIsLoading(true);
        }}
        onCreateOption={handleCreate}
        options={options}
        value={value}
        styles={colourStyles}
      />
    </motion.div>
  );
};

export default PopoverCreatableSelect;
