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

  // создаем и записываем в локальное хранинище идентификатор пользователя
  const [userId] = useLocalStorage('userId', roomId);
  // получаем из локального хранилища имя пользователя

  // useRef() используется не тоddлько для получения доступа к DOM-элементам,
  // но и для хранения любых мутирующих значений в течение всего жизненного цикла компонента
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

  const notify = (message) => toast('Wow so easy!');

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    socketRef.current = io(env.SERVER_URL, {
      transports: ['websocket'],
      query: token && `auth_token=${token}`,
      auth: { roomId },
      cors: { origin: '*' },
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

    socketRef.current.on('messages', (messages) => {
      setMessages(messages);
      getConversations();
      setIsLoading(false);
    });

    socketRef.current.on('conversations', (conversations) => {
      console.log(conversations);
      console.log(filter);

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
        console.log(isUnreadMatched);
        // Return true if both conditions are true, otherwise false
        return isStageMatched && isUserMatched && isUnreadMatched;
      });

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
            });
          return { ...stage, conversations: filteredConversations };
        });
      // console.log(filteredStages);
      setStatuses(filteredStages);
      // getConversations();
      setIsLoading(false);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, isAuth, filter]);

  // функция отправки сообщения
  // принимает объект с текстом сообщения и именем отправителя
  const sendMessage = ({ user, text, selectedConversation, type }) => {
    setMessages([
      ...messages,
      {
        from: { id: user._id, first_name: user.username },
        text,
        type: 'text',
        loading: true,
      },
    ]);
    // добавляем в объект id пользователя при отправке на сервер
    socketRef.current.emit('message:add', {
      isBot: true,
      user,
      text,
      selectedConversation,
      type,
    });

    // socketRef.current.emit('conversation:get');
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

  const updateStatuses = () => {
    setIsLoading(true);

    // добавляем в объект id пользователя при отправке на сервер
    console.log('UPDATE');
    socketRef?.current?.emit('status:update', statuses);

    setIsLoading(false);
    // socketRef.current.emit('conversation:get');
  };

  const changeStage = async (id, value, position) => {
    await socketRef?.current?.emit('status:change', { id, value, position });

    // await socketRef.current.emit('messages:get');
  };

  const createStatus = async (status) => {
    console.log(status);
    await socketRef?.current?.emit('status:add', status);
    await getStages();

    // await socketRef.current.emit('messages:get');
  };

  const linkUserToConversation = async (conversation) => {
    await socketRef?.current?.emit('conversation:link', conversation);
    await getStages();
    // await socketRef.current.emit('messages:get');
  };

  const unlinkUserToConversation = async (conversation) => {
    await socketRef?.current?.emit('conversation:unlink', conversation);
    await getStages();
    // await socketRef.current.emit('messages:get');
  };

  // отправляем на сервер событие "user:leave" перед перезагрузкой страницы
  // useBeforeUnload(() => {
  //   socketRef.current.emit('user:leave', userId);
  // });

  // хук возвращает пользователей, сообщения и функции для отправки удаления сообщений
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
    updateStatuses,
    setStatuses,
    changeStage,
    linkUserToConversation,
    searchInput,
    setSearchInput,
    createStatus,
    getStages,
    managers,
  };
};
