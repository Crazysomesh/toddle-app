import { Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';

import { ROUTES } from '../utils/constants';

function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <Box>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Button variant="contained" onClick={() => navigate(ROUTES.HOME)}>
        Go to Dashboard
      </Button>
    </Box>
  );
}

export default ErrorPage;
