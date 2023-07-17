import React from 'react';
import './ModalSettingsForm.css';
import ModalButton from '../ModalButton';
import ModalInput from '../ModalInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClose,
  faTag,
  faPalette,
  faKey,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useRef } from 'react';
import ModalColorPicker from '../ModalColorPicker';

const ModalSettingsForm = ({
  status,
  closeModal,
  updateStage,
  deleteStage,
}) => {
  const [label, setLabel] = useState(status.label);
  const [value, setValue] = useState(status.value);
  const [color, setColor] = useState(status.color);

  const formRef = useRef(null);

  const handleColorChange = (color, event) => {
    console.log(color);
    setColor(color.hex);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    if (!label || !value || !color) return alert('Поля не заполнены');
    await updateStage({ id: status?._id, label, value, color });
    closeModal();
  };

  const handleSubmitDelete = async (e) => {
    e.preventDefault();
    console.log(status?.conversations);
    if (status?.conversations.length) return alert('У этого статуса есть чаты');
    await deleteStage(status?._id);
    closeModal();
  };
  //   const handleKeyPress = (e) => {
  //     if (e.key === 'Enter') {
  //       e.preventDefault();
  //       handleSubmit(e);
  //     }
  //   };
  const handleStatus = (e) => {
    setLabel(e.target.value);
  };

  const handleKey = (e) => {
    setValue(e.target.value);
  };
  console.log(status);

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
        <span className="modal-title">Изменить статус</span>
        <FontAwesomeIcon
          onClick={closeModal}
          className="modal-title-icon"
          icon={faClose}
        />
      </div>
      <form ref={formRef} className="modal-form">
        <div style={{ width: '100%' }}>
          <ModalInput
            icon={faTag}
            placeholder={'Введите название статуса'}
            onChange={handleStatus}
            value={label}
            // onKeyPress={handleKeyPress}
          />
          {/* <span className="modal-form-title">Введите ключ статуса</span> */}
          <ModalInput
            icon={faKey}
            placeholder={'Введите ключ статуса'}
            onChange={handleKey}
            value={value}
            // onKeyPress={handleKeyPress}
          />
          <ModalColorPicker
            color={color}
            handleColorChange={handleColorChange}
            icon={faPalette}
            placeholder={'Выберите цвет'}
            onChange={handleKey}
            value={value}
            // onKeyPress={handleKeyPress}
          />
        </div>
        {/* <span className="modal-form-title">Введите название статуса</span> */}

        {/* <span className="modal-form-title">Выберите цвет</span> */}
        <div style={{ width: '100%', display: 'flex' }}>
          <ModalButton variant="simple" onClick={handleSubmitEdit}>
            Изменить статус
          </ModalButton>
          <ModalButton variant="warning" onClick={handleSubmitDelete}>
            Удалить статус
          </ModalButton>
        </div>
      </form>
    </div>
  );
};

export default ModalSettingsForm;
