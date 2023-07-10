import React from 'react';
import './ModalForm.css';
import ModalButton from '../ModalButton';
import ModalInput from '../ModalInput';
import { HexColorPicker } from 'react-colorful';
import { useState } from 'react';
import { useRef } from 'react';

const ModalForm = ({ createStatus, closeModal }) => {
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');
  const [color, setColor] = useState('#aabbcc');

  const formRef = useRef(null);

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
    <form ref={formRef} onSubmit={handleSubmit} className="modal-form">
      <span className="modal-form-title">Введите название статуса</span>
      <ModalInput
        placeholder={'"В работе/Закрытые/..."'}
        onChange={handleStatus}
        value={label}
        onKeyPress={handleKeyPress}
      />
      <span className="modal-form-title">Введите ключ статуса</span>
      <ModalInput
        placeholder={'"work/ready/free..."'}
        onChange={handleKey}
        value={value}
        onKeyPress={handleKeyPress}
      />
      <span className="modal-form-title">Выберите цвет</span>
      <HexColorPicker color={color} onChange={setColor} />
      <ModalButton onClick={handleSubmit}>Добавить статус</ModalButton>
    </form>
  );
};

export default ModalForm;
