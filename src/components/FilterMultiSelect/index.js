import React from 'react';
import chroma from 'chroma-js';

import Select, { StylesConfig } from 'react-select';

const FilterMultiSelect = ({ onChange, label, placeholder, options }) => {
  const colourStyles = {
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: '#778d9f',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      display: 'none', // Скрываем стрелку
    }),
    input: (styles) => ({
      ...styles,
      color: 'white',
      border: 'none',
    }),
    control: (provided) => ({
      ...provided,
      minWidth: '200px',
      fontSize: '14px',
      border: 'none',
      boxShadow: 'none',
      backgroundColor: 'transparent',
      borderRadius: 0,
      paddingRight: '10px',
      margin: 0,
      appearance: 'none',
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        fontSize: '14px',
        backgroundColor: isFocused ? '#73b9f3' : 'white',
        color: isFocused ? 'white' : 'black',
        cursor: isDisabled ? 'not-allowed' : 'default',

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : 'white'
            : undefined,
        },
      };
    },
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: '#528fc1',
        color: 'white',
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: 'white',
    }),
    placeholder: (styles) => ({
      ...styles,
      color: 'white',
      border: 'none',
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: 'white',
      ':hover': {
        backgroundColor: data.color,
        color: 'white',
      },
    }),
  };
  return (
    <div style={{ display: 'inline-block', fontSize: '12px', color: '#999' }}>
      <label style={{ padding: '0 10px' }}>{label}</label>
      <Select
        onChange={onChange}
        placeholder={placeholder}
        closeMenuOnSelect={false}
        defaultValue={[]}
        isMulti
        options={options}
        styles={colourStyles}
      />
    </div>
  );
};

export default FilterMultiSelect;
