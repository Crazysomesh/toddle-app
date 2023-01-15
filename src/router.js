import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Board from './pages/Board';
import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/NotFound';
import { ROUTES } from './utils/constants';

export default createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: ROUTES.DASHBOARD,
    element: <Dashboard />,
  },
  {
    path: ROUTES.BOARD,
    element: <Board />,
  },
]);
