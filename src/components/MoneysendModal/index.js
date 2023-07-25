import React, { useRef, useState } from 'react';
import ReactModal from 'react-modal';
import ModalInput from '../ModalInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
} from '@fortawesome/free-solid-svg-icons';
import ModalButton from '../ModalButton';
const MoneysendModal = ({
  modalIsOpen,
  closeModal,
  moneysend,
  conversation,
  user,
  sendMessage,
}) => {
  const [volume, setVolume] = useState('');
  const [give, setGive] = useState('');
  const [take, setTake] = useState('');
  const [regularity, setRegularity] = useState('');
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');
  const [conditions, setConditions] = useState('');

  const formRef = useRef(null);

  const handleMoneysend = async () => {
    await moneysend(conversation.chat_id, {
      title: conversation.title,
      link: conversation.link,
      user,
      volume,
      give,
      take,
      regularity,
      date,
      comment,
      conditions,
    });
    setVolume('');
    setGive('');
    setTake('');
    setRegularity('');
    setDate('');
    setComment('');
    setConditions('');
  };
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
          <span className="modal-title">Moneysend</span>
          <FontAwesomeIcon
            onClick={closeModal}
            className="modal-title-icon"
            icon={faClose}
          />
        </div>
        <form ref={formRef} className="modal-form">
          <div style={{ width: '100%' }}>
            <ModalInput
              icon={faMoneyBill}
              placeholder={'Объем'}
              onChange={(e) => setVolume(e.target.value)}
              value={volume}
            />
            <ModalInput
              icon={faArrowLeft}
              placeholder={'Отдают'}
              onChange={(e) => setGive(e.target.value)}
              value={give}
            />
            <ModalInput
              icon={faArrowRight}
              placeholder={'Получают'}
              onChange={(e) => setTake(e.target.value)}
              value={take}
            />
            <ModalInput
              icon={faTimeline}
              placeholder={'Регулярность'}
              onChange={(e) => setRegularity(e.target.value)}
              value={regularity}
            />
            <ModalInput
              icon={faCalendar}
              placeholder={'Сроки'}
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
            <ModalInput
              icon={faComment}
              placeholder={'Комментарий'}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <ModalInput
              icon={faTasks}
              placeholder={'Условия'}
              onChange={(e) => setConditions(e.target.value)}
              value={conditions}
            />
          </div>

          <div style={{ width: '100%', display: 'flex' }}>
            <ModalButton
              variant="simple"
              onClick={(e) => {
                handleMoneysend(e);
                closeModal(e);
              }}
            >
              Отправить
            </ModalButton>
          </div>
        </form>
      </div>
    </ReactModal>
  );
};

export default MoneysendModal;
