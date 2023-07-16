import React, { useEffect, useState } from 'react';
import './StatusSelect.css';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StatusSelect = ({ statuses, data, changeStage }) => {
  // console.log(selectedOption);

  function handleClick(event) {
    event.stopPropagation();
    // другой код, который нужно выполнить при клике на внутренний блок
  }

  const handleSelectChange = async (event) => {
    event.stopPropagation();
    const status = statuses.find((o) => o.value === event.target.value);
    // console.log(status);
    await changeStage(data._id, status.value);
    // setSelectedOption(data.stage);

    // console.log(event.target.value, option);
    // setSelectedOption(option); // update selected option when option is selected
  };
  //   console.log();

  return (
    <div className="status-div">
      <span style={{ color: data.stage?.color }} className="status-dot">
        &#8226;
      </span>
      <select
        className="status-select"
        value={data.stage?.value}
        onChange={handleSelectChange}
      >
        {statuses.map((option, index) => (
          <option
            key={index}
            className="status-select-option"
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      <FontAwesomeIcon icon={faCaretDown} />
    </div>
  );
};

export default StatusSelect;
