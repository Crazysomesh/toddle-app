import { Grid } from '@mui/material';
import React from 'react';

import emptyState from '../assets/images/emptyState.svg';

const BoardEmptyState = () => (
  <Grid
    container
    spacing={1}
    sx={{ width: '100%', height: '100%' }}
    direction="column"
    justifyContent="center"
    alignItems="center"
  >
    <Grid item>
      <img src={emptyState} alt="emptyState" />
    </Grid>
    <Grid item>
      <b>Nothing here yet</b>
    </Grid>
    <Grid item>
      Create your first post by clicking on the &apos;+&apos; button above
    </Grid>
  </Grid>
);

export default BoardEmptyState;
