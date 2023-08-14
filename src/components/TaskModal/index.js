import React, { useRef, useState } from 'react';
import ReactModal from 'react-modal';
import ModalInput from '../ModalInput';
import './TaskModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  faTag,
  faClose,
  faMoneyBill,
  faArrowLeft,
  faArrowRight,
  faTimeline,
  faCalendar,
  faComment,
  faTasks,
  faTimes,
  faClock,
  faUnderline,
  faCheck,
  faBoxOpen,
  faCaretUp,
} from '@fortawesome/free-solid-svg-icons';
import ModalButton from '../ModalButton';
const TaskModal = ({
  modalIsOpen,
  closeModal,
  moneysend,
  conversation,
  user,
  sendMessage,
  createTask,
  getConversations,
}) => {
  const [text, setText] = useState('');
  //   const [take, setTake] = useState('');
  //   const [regularity, setRegularity] = useState('');
  //   const [date, setDate] = useState('');
  //   const [comment, setComment] = useState('');
  //   const [conditions, setConditions] = useState('');

  const formRef = useRef(null);
  const [showDateRange, setShowDateRange] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());

  const handleCreateTask = () => {
    if (!text) return alert('Описание задачи отсутствует');
    const task = { text, endAt: dateTime, createdAt: new Date() };
    createTask(task);
  };
  console.log(dateTime);
  //   const handleMoneysend = async () => {
  //     await moneysend(conversation.chat_id, {
  //       title: conversation.title,
  //       link: conversation.link,
  //       user,
  //       volume,
  //       give,
  //       take,
  //       regularity,
  //       date,
  //       comment,
  //       conditions,
  //     });
  //     setVolume('');
  //     setGive('');
  //     setTake('');
  //     setRegularity('');
  //     setDate('');
  //     setComment('');
  //     setConditions('');
  //   };
  return (
    <ReactModal
      ariaHideApp={false}
      className="modal-item"
      overlayClassName="modal-overlay"
      isOpen={modalIsOpen}
      contentLabel="Example Modal"
      onRequestClose={closeModal}
    >
      <div style={{ width: '100%', height: '100%' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '15px 25px',
          }}
        >
          <span className="modal-title">Добавить задачу</span>
          <FontAwesomeIcon
            onClick={closeModal}
            className="modal-title-icon"
            icon={faClose}
          />
        </div>
        <form ref={formRef} className="modal-form">
          <div className="task-date-button">
            <FontAwesomeIcon
              className="modal-input-icon"
              icon={faClock}
              onClick={() => setShowDateRange(true)}
            />
            <DatePicker
              className="datetime-input"
              selected={dateTime}
              onChange={(date) => setDateTime(date)}
              showTimeSelect
              timeFormat="HH:MM"
              timeIntervals={30}
              timeCaption="time"
              dateFormat="MMMM d, yyyy HH:MM"
            />
          </div>
          <ModalInput
            icon={faTasks}
            placeholder={'Тип задачи'}
            // onChange={(e) => setDate(e.target.value)}
            // value={date}
          />
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              justifyContent: 'start',
            }}
          >
            <span
              style={{
                color: '#cccccc',
                fontSize: '14px',
                padding: '10px 10px',
                margin: '0px 10px 0px 10px',
              }}
            >
              Описание задачи:
            </span>
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <textarea
                onChange={(e) => setText(e.target.value)}
                value={text}
                className="textarea-input"
                placeholder="Введите текст"
              />
            </div>
          </div>
          <div style={{ width: '100%', display: 'flex' }}>
            <ModalButton
              variant="simple"
              onClick={(e) => {
                handleCreateTask();
                closeModal(e);
              }}
            >
              Создать
            </ModalButton>
          </div>
        </form>
      </div>
    </ReactModal>
  );
};

export default TaskModal;
