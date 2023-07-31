import { useEffect, useRef, useState } from 'react';
// получаем класс IO
import io from 'socket.io-client';

import env from 'react-dotenv';

import { useLocalStorage } from './useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { initializeBoard } from '../pages/BoardPage';

// const SERVER_URL = 'http://socket.1210059-cn07082.tw1.ru';

// хук принимает название комнаты
export const useChat = (roomId) => {
  // локальное состояние для пользователей
  const [searchInput, setSearchInput] = useState('');
  const [filter, setFilter] = useState({ user: '', stage: '', unread: '' });
  const [user, setUser] = useState();
  const [managers, setManagers] = useState([]);

  const [statuses, setStatuses] = useState([]);
  const [stages, setStages] = useState([]);

  const [isAuth, setAuth] = useState(false);
  const [boardSections, setBoardSections] = useState({});
  // локальное состояние для диалогов
  const [conversations, setConversations] = useState([]);
  // локальное состояние для сообщений
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(new Date().getFullYear() - 20),
      endDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        23,
        59,
        59
      ),
      key: 'selection',
    },
  ]);

  // создаем и записываем в локальное хранинище идентификатор пользователя
  const [userId] = useLocalStorage('userId', roomId);

  const socketRef = useRef(null);
  const navigate = useNavigate();

  const getConversations = async () => {
    socketRef.current.emit('conversation:get');
  };

  const getMessages = async () => {
    socketRef.current.emit('message:get');
  };

  const getStages = async () => {
    socketRef.current.emit('status:get');
  };

  const getManagers = async () => {
    socketRef.current.emit('user:get');
  };

  // const updateEndDate = () => {
  //   const updatedDateRange = [...dateRange]; // Create a copy of the original dateRange
  //   updatedDateRange[0].endDate = new Date(); // Update the endDate in the copied array

  //   setDateRange(updatedDateRange); // Set the updated dateRange using the setter function
  // };
  // const notify = (message) => toast('Wow so easy!');

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    socketRef.current = io(env.SERVER_URL, {
      transports: ['websocket', 'polling'],
      query: token && `auth_token=${token}`,
      auth: { roomId },
      cors: { origin: '*' },
      path: '/socket',
    });
    // отправляем запрос на получение сообщений
    clearMessages();
    socketRef.current.on('checkAuth', ({ user, logged_in }) => {
      if (!logged_in) return setAuth(false);
      setUser(user);
      setAuth(true);
    });

    socketRef.current.on('success', ({ accessToken, user }) => {
      window.localStorage.setItem('token', accessToken);
      setUser(user);
      setAuth(true);
      navigate('/messenger');
    });

    socketRef.current.on('connect_error', (err) => {
      console.log(err);
    });

    socketRef.current.on('error', (err) => {
      alert(err);
    });

    if (!isAuth)
      return () => {
        // при размонтировании компонента выполняем отключение сокета
        socketRef.current.disconnect();
      };
    getConversations();
    getStages();
    getMessages();
    getManagers();
    // обрабатываем получение сообщений
    socketRef.current.on('users', (users) => {
      setManagers(users);
    });

    socketRef.current.on('notification', (message) => {
      getStages();
    });
    console.log(dateRange[0]);
    socketRef.current.on('messages', (messages) => {
      setMessages(messages);
      getConversations();
      setIsLoading(false);
    });

    socketRef.current.on('conversations', (conversations) => {
      console.log(conversations);

      const filteredConversations = conversations.filter((conversation) => {
        // Check if the conversations stage matches the filters stage

        const isStageMatched = filter?.stage
          ? conversation?.stage?.value === filter?.stage
          : true;

        // Check if the conversations user matches the filters user
        const isUserMatched = filter?.user
          ? conversation?.user?._id === filter?.user
          : true;

        const unread = conversation?.unreadCount > 0 ? true : false;
        // console.log(unread, filter?.unread);

        const isUnreadMatched =
          filter?.unread !== '' ? unread === filter?.unread : true;

        const conversationDate = new Date(conversation?.workAt).getTime();
        const startDate = new Date(dateRange[0].startDate).getTime();
        const conversationDay = new Date(conversationDate).getDate();
        const startDay = new Date(startDate).getDate();
        const endDate = new Date(dateRange[0].endDate).getTime();
        const isDateMatched =
          (conversationDate >= startDate && conversationDate <= endDate) ||
          startDay === conversationDay;

        return (
          isStageMatched && isUserMatched && isUnreadMatched && isDateMatched
        );
      });

      console.log(filteredConversations);
      setConversations(filteredConversations);
    });

    socketRef.current.on('statuses', (stages) => {
      setStages(stages);
      const filteredStages = stages
        .filter((stage) => {
          return filter?.stage ? stage.value === filter?.stage : true;
        })
        .map((stage) => {
          const filteredConversations = stage.conversations
            .filter((conversation) => {
              return filter?.user
                ? conversation?.user?._id === filter?.user
                : true;
            })
            .filter((conversation) => {
              const unread = conversation?.unreadCount > 0 ? true : false;

              return filter?.unread !== '' ? unread === filter?.unread : true;
            })
            .filter((conversation) => {
              const conversationDate = new Date(conversation?.workAt);
              const startDate = new Date(dateRange[0].startDate);
              const conversationDay = new Date(conversationDate).getDate();
              const startDay = new Date(startDate).getDate();
              if (startDay === conversationDay) {
                console.log('Два таймстампа находятся в один день');
              } else {
                console.log('Два таймстампа находятся в разные дни');
              }
              const endDate = new Date(dateRange[0].endDate);
              console.log(
                startDate.getTime(),
                conversationDate.getTime(),
                endDate.getTime(),
                (conversationDate >= startDate &&
                  conversationDate <= endDate) ||
                  startDay === conversationDay
              );
              return (
                (conversationDate >= startDate &&
                  conversationDate <= endDate) ||
                startDay === conversationDay
              );
            });

          return { ...stage, conversations: filteredConversations };
        });
      setStatuses(filteredStages);
      setIsLoading(false);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, isAuth, filter, dateRange]);

  const sendComment = ({
    type,
    text,
    from,
    selectedConversation,
    isBot,
    unread,
    date,
  }) => {
    socketRef.current.emit(
      'message:add',
      {
        type,
        text,
        from,
        isBot,
        unread,
        date,
      },
      selectedConversation
    );
  };

  const moneysend = (chat_id, data) => {
    socketRef.current.emit('message:moneysend', { chat_id, data });
  };

  const sendMessage = ({ user, text, selectedConversation, type }) => {
    setMessages([
      ...messages,
      {
        from: { id: user._id, first_name: user.username },
        text,
        type: type,
        loading: true,
      },
    ]);
    socketRef.current.emit('message:add', {
      isBot: true,
      user,
      text,
      selectedConversation,
      type,
    });
  };

  const login = async ({ username, password }) => {
    socketRef.current.emit('login', { username: username, password: password });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser({});
    setAuth(false);
    socketRef.current.emit('logout');
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const deleteStage = (id) => {
    setIsLoading(true);

    socketRef?.current?.emit('status:delete', { id });

    setIsLoading(false);
  };

  const updateStage = (status) => {
    setIsLoading(true);

    socketRef?.current?.emit('status:update', status);

    setIsLoading(false);
  };

  const changeStage = async (id, value, position) => {
    await socketRef?.current?.emit('status:change', { id, value, position });
  };

  const moveStatus = async (position, value) => {
    await socketRef?.current?.emit('status:move', { position, value });
  };

  const createStatus = async (status) => {
    await socketRef?.current?.emit('status:add', status);
    await getStages();
  };

  const refreshLink = async (chat_id) => {
    await socketRef?.current?.emit('conversation:refresh', { chat_id });
  };

  const linkUserToConversation = async (chat_id, user) => {
    await socketRef?.current?.emit('conversation:link', { chat_id, user });
  };

  const readConversation = async (chat_id) => {
    await socketRef?.current?.emit('conversation:read', { chat_id });
  };

  return {
    filter,
    setFilter,
    user,
    isAuth,
    login,
    logout,
    isLoading,
    statuses,
    stages,
    boardSections,
    setBoardSections,
    conversations,
    messages,
    sendMessage,
    setStatuses,
    changeStage,
    linkUserToConversation,
    searchInput,
    setSearchInput,
    createStatus,
    getStages,
    managers,
    updateStage,
    deleteStage,
    readConversation,
    sendComment,
    refreshLink,
    moneysend,
    moveStatus,
    dateRange,
    setDateRange,
  };
};
