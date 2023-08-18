import {
  AUTH_ROUTE,
  BOARD_ROUTE,
  MESSENGER_ROUTE,
  TASKS_ROUTE,
} from './utils/consts';

import AuthPage from './pages/AuthPage';
import MessengerPage from './pages/MessengerPage';
import BoardPage from './pages/BoardPage';
import TaskPage from './pages/TaskPage';

export const authRoutes = [
  {
    path: MESSENGER_ROUTE,
    Component: MessengerPage,
  },
  {
    path: BOARD_ROUTE,
    Component: BoardPage,
  },
  {
    path: TASKS_ROUTE,
    Component: TaskPage,
  },
];

export const publicRoutes = [
  {
    path: AUTH_ROUTE,
    Component: AuthPage,
  },
];
