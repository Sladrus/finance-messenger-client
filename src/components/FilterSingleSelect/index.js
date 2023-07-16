import React from 'react';
import chroma from 'chroma-js';

import Select, { StylesConfig } from 'react-select';

// const colourOptions = [
//   { value: '', label: 'Все', color: 'white' },
//   { value: 'ocean', label: 'Свободные', color: '#00B8D9' },
//   { value: 'blue', label: 'Необработанные', color: '#0052CC' },
//   { value: 'purple', label: 'В работе', color: '#5243AA' },
//   { value: 'red', label: 'Активированные', color: '#FF5630' },
// ];

const FilterSingleSelect = ({ onChange, label, options }) => {
  const dot = (color = 'transparent') => ({
    alignItems: 'center',
    display: 'flex',

    ':before': {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: 'block',
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });

  const colourStyles = {
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: '#778d9f',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      display: 'none', // Скрываем стрелку
    }),
    control: (provided) => ({
      ...provided,
      fontSize: '14px',
      border: 'none',
      boxShadow: 'none',
      backgroundColor: 'transparent',
      borderRadius: 0,
      paddingRight: '10px',
      margin: 0,
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
    }),
    input: (styles) => ({
      ...styles,
      ...dot(),
      color: 'white',
      border: 'none',
    }),
    placeholder: (styles) => ({
      ...styles,
      ...dot('white'),
      color: 'white',
      border: 'none',
    }),
    singleValue: (styles, { data }) => ({
      ...styles,
      ...dot(!data.color ? 'white' : data.color),
      color: 'white',
      border: 'none',
    }),
  };
  return (
    <div style={{ display: 'inline-block', fontSize: '12px', color: '#999' }}>
      <label style={{ padding: '0 10px' }}>{label}</label>
      <Select
        onChange={onChange}
        defaultValue={options[0]}
        options={options}
        styles={colourStyles}
      />
    </div>
  );
};

export default FilterSingleSelect;
