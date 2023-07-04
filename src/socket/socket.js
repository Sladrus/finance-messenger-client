import { io } from 'socket.io-client';

const SERVER_URL = 'http://socket.1210059-cn07082.tw1.ru';

export const createSocketConnection = (userId) => {
  const socket = io(SERVER_URL, {
    query: { userId },
    cors: { origin: '*' },
  });

  return socket;
};
