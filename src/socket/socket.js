import { io } from 'socket.io-client';

const SERVER_URL = 'http://localhost:5005';

export const createSocketConnection = (userId) => {
  const socket = io(SERVER_URL, {
    query: { userId },
    cors: { origin: '*' },
  });

  return socket;
};
