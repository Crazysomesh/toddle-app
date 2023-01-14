import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/NotFound';
import Board from './pages/Board';

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
  }
]);
