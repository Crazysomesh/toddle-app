import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

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
]);
