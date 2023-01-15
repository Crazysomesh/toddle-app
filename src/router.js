import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Board from './pages/Board';
import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/NotFound';

export default createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/board/:id',
    element: <Board />,
  },
]);
