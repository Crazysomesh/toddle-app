import { Box } from '@mui/material';
import React from 'react';

import Header from '../components/Header';

function Dashboard() {
  return (
    <div>
      <Header />
      <Box sx={{ padding: '40px 72px 0px' }}>
        <h2>My Boards</h2>
      </Box>
    </div>
  );
}

export default Dashboard;
