import React from 'react';
import './ModalForm.css';
import ModalButton from '../ModalButton';
import ModalInput from '../ModalInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClose,
  faTag,
  faPalette,
  faKey,
} from '@fortawesome/free-solid-svg-icons';
import { HexColorPicker } from 'react-colorful';
import { useState } from 'react';
import { useRef } from 'react';
import ModalColorPicker from '../ModalColorPicker';

const ModalForm = ({ createStatus, closeModal }) => {
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');
  const [color, setColor] = useState('#aabbcc');

  const formRef = useRef(null);

  const handleColorChange = (color, event) => {
    console.log(color);
    setColor(color.hex);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!label || !value || !color) return alert('Поля не заполнены');
    await createStatus({ label, value, color, default: false });
    closeModal();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  const handleStatus = (e) => {
    setLabel(e.target.value);
  };

  const handleKey = (e) => {
    setValue(e.target.value);
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '15px 25px',
        }}
      >
        <span className="modal-title">Создать статус</span>
        <FontAwesomeIcon
          onClick={closeModal}
          className="modal-title-icon"
          icon={faClose}
        />
      </div>
      <form ref={formRef} onSubmit={handleSubmit} className="modal-form">
        <div style={{ width: '100%' }}>
          <ModalInput
            icon={faTag}
            placeholder={'Введите название статуса'}
            onChange={handleStatus}
            value={label}
            onKeyPress={handleKeyPress}
          />
          {/* <span className="modal-form-title">Введите ключ статуса</span> */}
          <ModalInput
            icon={faKey}
            placeholder={'Введите ключ статуса'}
            onChange={handleKey}
            value={value}
            onKeyPress={handleKeyPress}
          />
          <ModalColorPicker
            color={color}
            handleColorChange={handleColorChange}
            icon={faPalette}
            placeholder={'Выберите цвет'}
            onChange={handleKey}
            value={value}
            onKeyPress={handleKeyPress}
          />
        </div>
        {/* <span className="modal-form-title">Введите название статуса</span> */}

        {/* <span className="modal-form-title">Выберите цвет</span> */}
        <div style={{ width: '100%', display: 'flex' }}>
          <ModalButton onClick={handleSubmit}>Добавить статус</ModalButton>
        </div>
      </form>
    </div>
  );
};

export default ModalForm;
