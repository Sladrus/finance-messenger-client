import { useEffect, useRef, useState } from 'react';
// получаем класс IO
import io from 'socket.io-client';

import env from 'react-dotenv';

import { useLocalStorage } from './useLocalStorage';
import { useNavigate } from 'react-router-dom';

// хук принимает название комнаты
export const useChat = (roomId) => {
  // локальное состояние для пользователей
  const [searchInput, setSearchInput] = useState('');
  const [searchLoading, setSearchLoading] = useState(true);
  const [nextPageLoading, setNextPageLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [filter, setFilter] = useState({
    user: '',
    stage: '',
    unread: '',
    task: '',
  });
  const [user, setUser] = useState();
  const [tasks, setTasks] = useState([]);
  const [tags, setTags] = useState([]);

  const [managers, setManagers] = useState([]);

  const [statuses, setStatuses] = useState([]);
  const [stages, setStages] = useState([]);

  const [isAuth, setAuth] = useState(false);
  const [boardSections, setBoardSections] = useState({});
  const [conversation, setConversation] = useState(null);

  // локальное состояние для диалогов
  const [conversations, setConversations] = useState([]);
  const [conversationsCount, setConversationsCount] = useState(0);
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

  const getConversations = async (page, searchInput) => {
    socketRef.current.emit('conversation:get', {
      page,
      searchInput,
      filter,
      dateRange,
    });
  };

  const getConversation = async () => {
    socketRef.current.emit('conversation:getOne', {
      chat_id: roomId,
    });
  };

  const getTasks = async () => {
    socketRef.current.emit('task:get');
  };

  const getTags = async () => {
    socketRef.current.emit('tags:get');
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

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    socketRef.current = io(env.SERVER_URL, {
      transports: ['websocket', 'polling'],
      query: token && `auth_token=${token}`,
      auth: { roomId },
      cors: { origin: '*' },
      path: '/socket',
      reconnection: true,
      compress: true,
    });
    // отправляем запрос на получение сообщений
    clearMessages();
    socketRef.current.on('checkAuth', ({ user, logged_in }) => {
      if (!logged_in) return setAuth(false);
      setUser(user);
      setAuth(true);
    });

    socketRef.current.on('reconnect', () => {
      console.log('Trying to reconnect');
    });

    socketRef.current.on('success', ({ accessToken, user }) => {
      window.localStorage.setItem('token', accessToken);
      setUser(user);
      setAuth(true);
      navigate('/messenger');
    });

    socketRef.current.on('connect_error', (err) => {
      console.log(err);
      window.localStorage.removeItem('token');
      setAuth(false);
    });

    socketRef.current.on('error', (err) => {
      alert(err);
    });

    if (!isAuth)
      return () => {
        // при размонтировании компонента выполняем отключение сокета
        socketRef.current.disconnect();
      };
    getConversation();
    getConversations(currentPage, searchInput);
    getStages();
    getMessages();
    getManagers();
    getTasks();
    getTags();
    // обрабатываем получение сообщений
    socketRef.current.on('users', (users) => {
      setManagers(users);
    });

    socketRef.current.on('notification', (message) => {
      // getStages();
    });

    socketRef.current.on('messages', (messages) => {
      setMessages(messages);
      setIsLoading(false);
    });

    socketRef.current.on('conversations', ({ conversations, count }) => {
      setConversations(conversations);
      setConversationsCount(count);
      setSearchLoading(false);
      setNextPageLoading(false);
    });

    socketRef.current.on('conversation', ({ conversation }) => {
      setConversation(conversation);
    });

    socketRef.current.on('tasks', (tasks) => {
      setTasks(tasks);
    });

    socketRef.current.on('tags', (tags) => {
      setTags(tags);
    });

    socketRef.current.on('statuses', async (stages) => {
      setStages(stages);
      setStatuses(stages);
      for (const stage of stages) {
        await socketRef.current.emit('status:value', { value: stage.value });
      }
      setIsLoading(false);
    });

    socketRef.current.on('status:updated', (updatedStatus) => {
      setStatuses((prevStatuses) =>
        prevStatuses.map((status) =>
          status.value === updatedStatus.value ? updatedStatus : status
        )
      );
    });

    socketRef.current.on('status:deleted', (id) => {
      setStatuses((prevStatuses) =>
        prevStatuses.filter((status) => status._id !== id)
      );
    });

    socketRef.current.on('statuses:load', ({ oldTmp, newTmp }) => {
      setStatuses((prevStatuses) => {
        // Находим индексы старого и нового статусов
        const oldStatusIndex = prevStatuses.findIndex(
          (status) => status.value === oldTmp.value
        );
        const newStatusIndex = prevStatuses.findIndex(
          (status) => status.value === newTmp.value
        );

        // Создаем копию массива состояния
        const updatedStatuses = [...prevStatuses];

        // Обновляем соответствующие элементы массива
        if (oldStatusIndex !== -1 && newStatusIndex !== -1) {
          updatedStatuses[oldStatusIndex] = oldTmp;
          updatedStatuses[newStatusIndex] = newTmp;
        }
        console.log(newTmp);
        return updatedStatuses;
      });
    });

    socketRef.current.on('status:conversation', async (conversationTmp) => {
      setConversations((prevConversations) =>
        prevConversations.map((conversation) => {
          if (conversation?._id === conversationTmp?._id) {
            return conversationTmp;
          }
          return conversation;
        })
      );

      setStatuses((prevStatuses) =>
        prevStatuses.map((stage) => {
          // Проверяем, совпадает ли stage текущего элемента stages с искомым
          if (stage?.value === conversationTmp?.stage?.value) {
            // Если да, используем метод map для перебора conversations внутри текущего stage
            const updatedConversations = stage.conversations.map(
              (conversation) => {
                // Проверяем, совпадает ли stage текущего conversation с искомым
                if (conversation._id === conversationTmp._id) {
                  // Если да, обновляем значение conversation
                  return conversationTmp;
                }
                // Возвращаем неизмененный conversation, если его stage не совпадает
                return conversation;
              }
            );

            // Возвращаем обновленный stage с обновленными conversations
            return {
              ...stage,
              conversations: updatedConversations,
            };
          }

          // Возвращаем неизмененный stage, если его stage не совпадает
          return stage;
        })
      );
      await getConversations(currentPage, searchInput);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, isAuth]);

  useEffect(() => {
    socketRef.current.on('status:load', (updatedStatus) => {
      setStatuses((prevStatuses) =>
        prevStatuses.map((status) =>
          status.value === updatedStatus.value ? updatedStatus : status
        )
      );
    });
  }, [statuses]);

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
    localStorage.removeItem('token');
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
    // await getStages();
  };

  const refreshLink = async (chat_id) => {
    await socketRef?.current?.emit('conversation:refresh', { chat_id });
  };

  const linkUserToConversation = async (chat_id, user) => {
    await socketRef?.current?.emit('conversation:link', { chat_id, user });
    await getMessages();
  };

  const changeUserToConversation = async (chat_id, user) => {
    await socketRef?.current?.emit('conversation:changeuser', {
      chat_id,
      user,
    });
    await getMessages();
  };

  const readConversation = async (chat_id) => {
    await socketRef?.current?.emit('conversation:read', { chat_id });
  };

  const createTask = async (task) => {
    await socketRef?.current?.emit('conversation:taskCreate', {
      task,
      chat_id: roomId,
      user,
    });
  };

  const createTag = async (value) => {
    console.log(value);
    await socketRef?.current?.emit('tags:create', {
      value,
      chat_id: roomId,
      user,
    });
  };

  const addTag = async (value) => {
    console.log(value);
    await socketRef?.current?.emit('tags:add', {
      value,
      chat_id: roomId,
      user,
    });
  };

  const removeTag = async (value) => {
    console.log(value);
    await socketRef?.current?.emit('tags:remove', {
      value,
      chat_id: roomId,
      user,
    });
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
    changeUserToConversation,
    getConversations,
    currentPage,
    setCurrentPage,
    searchLoading,
    setSearchLoading,
    nextPageLoading,
    setNextPageLoading,
    conversationsCount,
    createTask,
    tasks,
    tags,
    createTag,
    addTag,
    removeTag,
    conversation,
    setConversation,
  };
};
