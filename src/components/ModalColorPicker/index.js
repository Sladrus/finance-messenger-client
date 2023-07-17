import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { ChromePicker, SliderPicker, TwitterPicker } from 'react-color';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

const ModalColorPicker = ({
  icon,
  placeholder,
  value,
  onChange,
  onKeyPress,
  color,
  handleColorChange,
}) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
    console.log('open color ');
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const popover = {
    position: 'relative',
    width: '100%',
    zIndex: '2',
  };
  const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  };

  return (
    <div style={{ width: '100%' }}>
      <div onClick={handleClick} className="modal-input">
        <FontAwesomeIcon
          style={{ color }}
          className="modal-input-icon"
          icon={icon}
        />
        <span className="modal-input-color">{color}</span>
        <FontAwesomeIcon
          className="modal-input-icon-caret"
          icon={displayColorPicker ? faCaretUp : faCaretDown}
        />
      </div>
      {displayColorPicker ? (
        <div style={popover}>
          <div style={cover} onClick={handleClose} />
          <TwitterPicker
            width="100%"
            triangle="hide"
            color={color}
            onChange={handleColorChange}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ModalColorPicker;
