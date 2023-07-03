import { AUTH_ROUTE, BOARD_ROUTE, MESSENGER_ROUTE } from './utils/consts';

import AuthPage from './pages/AuthPage';
import MessengerPage from './pages/MessengerPage';
import BoardPage from './pages/BoardPage';

export const authRoutes = [
  {
    path: MESSENGER_ROUTE,
    Component: MessengerPage,
  },
  {
    path: BOARD_ROUTE,
    Component: BoardPage,
  },
];

export const publicRoutes = [
  {
    path: AUTH_ROUTE,
    Component: AuthPage,
  },
];
