import React, { useEffect, useRef, useState } from 'react';
import { useLayer, Arrow, useHover } from 'react-laag';
import { motion, AnimatePresence } from 'framer-motion';
import './Compose.css';
import ToolbarButton from '../ToolbarButton';
import {
  faArrowRight,
  faPlus,
  faComment,
  faPhotoVideo,
  faTag,
  faTags,
  faFile,
  faLink,
  faCaretRight,
  faTasks,
  faChartLine,
  faCheck,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import 'react-dropdown/style.css';
import PopoverInput from '../PopoverInput';
import PopoverButton from '../PopoverButton';
import PopoverModal from '../PopoverModal';
import PopoverSelect from '../PopoverSelect';
import { evaluate } from 'mathjs';
import CoursePopover from '../CoursePopover';
import { hover } from '@testing-library/user-event/dist/hover';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MoneysendModal from '../MoneysendModal';

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function Compose({
  user,
  selectedConversation,
  sendMessage,
  readConversation,
  linkUserToConversation,
  conversations,
  statuses,
  sendComment,
  moneysend,
  managers,
  changeStage,
  changeUserToConversation,
}) {
  const [text, setText] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [currency, setCurrency] = useState('');
  const [expression, setExpression] = useState('');
  const [isCommand, setIsCommand] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [finalCourse, setFinalCourse] = useState('');
  const [hoverProps, hoverState] = useHover();

  const [courseOpen, setCourseOpen] = useState(false);

  const [popoverModalIsOpen, setPopoverModalIsOpen] = useState(false);
  const [modalValue, setModalValue] = useState();
  const [isMoneysendOpen, setIsMoneysendOpen] = useState(false);

  const inputElement = useRef(null);
  useEffect(() => {
    inputElement.current.focus();
  }, [selectedConversation]);

  const openMoneysend = (e) => {
    e.stopPropagation();
    setIsMoneysendOpen(true);
  };
  const closeMoneysend = (e) => {
    e.stopPropagation();
    setIsMoneysendOpen(false);
  };
  const handleSendMessage = (e) => {
    console.log(e);
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed) {
      sendMessage({
        user: user,
        text: text,
        selectedConversation: selectedConversation,
        type: 'text',
      });
      setText('');
      setCourseOpen(false);
      setIsCommand(false);
      setFinalCourse('');
    }
  };

  const sendCourse = (e) => {
    const halfLength = Math.ceil(currency.length / 2);
    const firstHalf = currency.slice(0, halfLength);

    e.preventDefault();
    sendMessage({
      user: user,
      text: `${expression} ${firstHalf} = ${finalCourse?.course}`,
      selectedConversation: selectedConversation,
      type: 'text',
    });
    setText('');
  };

  function close() {
    setOpen(false);
  }
  const {
    renderLayer: renderLayer,
    triggerProps: triggerProps,
    layerProps: layerProps,
  } = useLayer({
    isOpen,
    onOutsideClick: close,
    onDisappear: close,
    overflowContainer: true,
    auto: true,
    placement: 'top-start',
    triggerOffset: 20,
    containerOffset: 20,
    arrowOffset: 0,
  });

  const conversation = conversations.find(
    (o) => o.chat_id === selectedConversation
  );

  const isValidCommand = (input) => {
    return /^\/[a-z]{6}[ ]?\d*([+\-*\/]\d+|\d*[.,]?\d+)*%?/.test(input);
  };

  const handleModalValue = (value, type) => {
    setModalValue({ type, value });
    setPopoverModalIsOpen(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.shiftKey) {
      event.preventDefault();
      setText((prevValue) => prevValue + '\n');
      inputElement.current.style.height = '20px';
      inputElement.current.style.height = `${event.target.scrollHeight - 10}px`;
    }

    if (event.key === 'Enter' && event.shiftKey === false) {
      event.preventDefault(); // Отменяем стандартное поведение клавиши Enter
      event.stopPropagation();
      handleSendMessage(event);
      inputElement.current.style.height = '20px';
    }
  };

  async function convertCurrencyEx(currencies, amount) {
    const exchangeApi = axios.create({
      baseURL: 'http://converter.1210059-cn07082.tw1.ru',
    });

    const count = amount || 1;
    try {
      const response = await exchangeApi.get(
        `/convert?from=${currencies[0].toUpperCase()}&to=${currencies[1].toUpperCase()}&amount=${count}`
      );
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }

  async function convertCurrencyMoex(currencies, amount) {
    const exchangeApi = axios.create({
      baseURL: 'http://converter.1210059-cn07082.tw1.ru',
    });

    const count = amount || 1;
    try {
      const response = await exchangeApi.get(
        `/convert_moex?from=${currencies[0].toUpperCase()}&to=${currencies[1].toUpperCase()}&amount=${count}`
      );
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }

  const fetchCurrencyRate = async (currency, expression) => {
    const currency_codes = ['EURRUB', 'USDRUB'];
    let type;
    if (currency_codes.includes(currency.toUpperCase())) {
      type = 'moex.com';
    } else {
      type = 'xe.com';
    }
    const halfLength = Math.ceil(currency.length / 2);
    const firstHalf = currency.slice(0, halfLength);
    const secondHalf = currency.slice(halfLength);

    const currencies = [firstHalf, secondHalf];
    const fakeAmount = randomIntFromInterval(1000, 100000);

    setIsLoading(true);
    try {
      const data =
        type === 'xe.com'
          ? await convertCurrencyEx(currencies, fakeAmount)
          : await convertCurrencyMoex(currencies, fakeAmount);
      const course = Number(data.course.split(' ')[0]);
      const realAmount = expression
        ? (course / fakeAmount) * evaluate(expression)
        : course / fakeAmount;
      setFinalCourse({
        course: `${realAmount.toFixed(4)} ${currencies[1]}`,
        updated: data.updated,
        type,
      });
    } catch (e) {
      console.log(e);
      setFinalCourse('');
    }
    setIsLoading(false);
  };

  const processCommand = async (inputCommand) => {
    const [cur, expr] = inputCommand.slice(1).split(' ');
    setCurrency(cur.toUpperCase());
    try {
      evaluate(expr);
      setExpression(expr);
    } catch (e) {
      setExpression('NaN');
    }
  };

  const handleChangeText = async (e) => {
    inputElement.current.style.height = '20px';
    inputElement.current.style.height = `${e.target.scrollHeight - 10}px`;
    const updatedText = e.target.value;

    setText(updatedText);
    setFinalCourse('');
    setIsCommand(isValidCommand(updatedText));
    await processCommand(updatedText);
  };

  const [statusIsLoading, setStatusIsLoading] = useState(false);
  const [managerIsLoading, setManagerIsLoading] = useState(false);

  useEffect(() => {
    setCourseOpen(isCommand);
  }, [isCommand]);

  const managersOptions = [
    { value: null, label: 'Нет менеджера' },
    ...managers.map((manager) => ({
      value: manager._id,
      label: manager.username,
      color: 'white',
    })),
  ];

  useEffect(() => {
    // setConversationState(conversation);
    console.log('UPDATE');
    if (!conversation?.stage?.loading) {
      setStatusIsLoading(false);
    }
    if (!conversation?.user?.loading) {
      setManagerIsLoading(false);
    }
  }, [conversation]);

  console.log(conversation);
  return (
    <form className="compose" onSubmit={handleSendMessage}>
      <div>
        <ToolbarButton
          icon={faPlus}
          triggerProps={triggerProps}
          onClick={() => setOpen(!isOpen)}
        />
        {renderLayer(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="toolbar-popover"
                {...layerProps}
              >
                <PopoverButton
                  icon={faCheck}
                  placeholder={
                    conversation?.unreadCount > 0 ? 'Прочитать' : 'Прочитано'
                  }
                  onClick={() => readConversation(selectedConversation)}
                  isEnabled={conversation?.unreadCount > 0 ? false : true}
                />
                <PopoverButton
                  icon={faPaperPlane}
                  placeholder={'Moneysend'}
                  onClick={openMoneysend}
                  // onClick={() => readConversation(selectedConversation)}
                  // isEnabled={conversation?.unreadCount > 0 ? false : true}
                />
                {user.role === 'ADMIN' && (
                  <PopoverSelect
                    icon={conversation?.user ? faLink : faPlus}
                    options={[...managersOptions]}
                    isLoading={managerIsLoading}
                    defaultValue={
                      conversation?.user
                        ? {
                            value: conversation?.user?._id,
                            label: conversation?.user?.username,
                            color: 'white',
                          }
                        : {
                            value: null,
                            label: 'Нет менеджера',
                            color: 'white',
                          }
                    }
                    onSubmit={(data) => {
                      setManagerIsLoading(true);
                      const manager = managers.find(
                        (o) => o._id === data.value
                      );
                      console.log(manager);
                      conversation.user = {};
                      conversation.user._id = data.value;
                      conversation.user.username =
                        data.label || 'Нет менеджера';
                      changeUserToConversation(selectedConversation, manager);
                      conversation.user.loading = true;
                    }}
                  />
                )}
                <PopoverSelect
                  icon={faTag}
                  placeholder={conversation.stage.label}
                  options={[...statuses]}
                  conversation={conversation}
                  isLoading={statusIsLoading}
                  onSubmit={(data) => {
                    setStatusIsLoading(true);
                    conversation.stage.value = data.value;
                    conversation.stage.label = data.label;
                    conversation.stage.color = data.color;
                    conversation.stage.loading = true;
                    changeStage(conversation._id, data.value, 0);
                    console.log(data);
                  }}
                  defaultValue={{
                    value: conversation?.stage?.value,
                    label: conversation?.stage?.label,
                    color: conversation?.stage?.color,
                  }}
                />
                <PopoverInput
                  icon={faComment}
                  placeholder={'Добавить комментарий'}
                  type={'comment'}
                  onSubmit={handleModalValue}
                  sendMessage={sendMessage}
                />
                <PopoverInput
                  icon={faTasks}
                  placeholder={'Добавить задачу'}
                  onSubmit={handleModalValue}
                />

                <PopoverInput icon={faTags} placeholder={'Тэги'} />
                <PopoverInput
                  icon={faPhotoVideo}
                  placeholder={'Фото или видео'}
                />
                <PopoverInput icon={faFile} placeholder={'Документ'} />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
      <textarea
        type="textarea"
        ref={inputElement}
        rows={1}
        cols={1}
        value={text}
        multiline={true}
        onKeyDown={handleKeyDown}
        onChange={handleChangeText}
        className="compose-input"
        placeholder="Write a message..."
      />
      {isCommand && (
        <AnimatePresence {...hoverProps}>
          {courseOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                top: `${
                  expression !== 'NaN'
                    ? !isLoading
                      ? finalCourse?.course
                        ? '-125px'
                        : '-85px'
                      : '-105px'
                    : '-55px'
                }`,
                left: '10px',
                background: 'white',
                border: '1px solid gray',
                minWidth: '230px',
                color: '#778d9f',
                background: '#101b25',
                borderRadius: '5px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '10px',
                }}
              >
                <span>
                  {expression !== 'NaN'
                    ? `${currency}: ${expression}`
                    : 'Ошибка, проверьте правильность ввода'}
                </span>
                <>
                  <span>
                    {isLoading ? (
                      <ClipLoader
                        color={'#729bbd'}
                        loading={isLoading}
                        size={10}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    ) : (
                      <>
                        {finalCourse?.course && <span>Результат: </span>}
                        <span style={{ color: 'white' }}>
                          {finalCourse?.course}
                        </span>
                      </>
                    )}
                  </span>
                  <span
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    {!isLoading && (
                      <span style={{ paddingRight: '10px' }}>
                        {finalCourse?.updated}
                      </span>
                    )}
                    {!isLoading && <span>{finalCourse?.type}</span>}
                  </span>
                </>
                {expression !== 'NaN' && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '5px',
                    }}
                  >
                    <span
                      onClick={() => fetchCurrencyRate(currency, expression)}
                      style={{
                        fontSize: '18px',
                        color: 'white',
                        fontWeight: '500',
                        cursor: 'pointer',
                      }}
                    >
                      Рассчитать курс
                    </span>
                    {finalCourse?.course && (
                      <FontAwesomeIcon
                        // className={`toolbar-button`}

                        style={{
                          width: '25px',
                          height: '25px',
                          cursor: 'pointer',
                          paddingTop: '3px',
                        }}
                        icon={faCaretRight}
                        onClick={sendCourse}
                      />
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
      {text && (
        <ToolbarButton icon={faArrowRight} onClick={handleSendMessage} />
      )}
      <PopoverModal
        sendComment={sendComment}
        modalIsOpen={popoverModalIsOpen}
        closeModal={() => setPopoverModalIsOpen(false)}
        modalValue={modalValue}
        user={user}
        selectedConversation={selectedConversation}
      />
      <MoneysendModal
        modalIsOpen={isMoneysendOpen}
        closeModal={closeMoneysend}
        moneysend={moneysend}
        conversation={conversation}
        user={user}
        sendMessage={sendMessage}
      />
    </form>
  );
}
