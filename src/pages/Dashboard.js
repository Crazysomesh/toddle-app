import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Menu,
  MenuItem,
  Grid
} from '@mui/material';
import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import CreateBoardPopup from '../components/CreateBoardPopup';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Dashboard() {
  const [boardModal, setBoardModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = () => {
    setOpenMenu(false);
    setAnchorEl(null);
  };

  const editBoard = () => {

  };

  const deleteBoard = () => {

  }

  const saveBoard = (board) => {

  };

  const options = [
    {
      label: 'Edit',
      id: 'edit-board',
      icon: <EditIcon />,
      handleMenuClick: editBoard
    },
    {
      label: 'Delete',
      id: 'delete-board',
      icon: <DeleteIcon />,
      handleMenuClick: deleteBoard
    }
  ]

  return (
    <>
      <Header newBoard={() => setCreateBoardModal(true)} />
      <Box sx={{ padding: '40px 72px 0px' }}>
        <Box>
          <h2>My Boards</h2>
        </Box>
        <Box
          sx={{
            position: 'relative',
            marginTop: '32px',
            height: '80px',
            width: '364px',
            border: '1px solid #EBEBEB',
            borderRadius: '8px',
          }}
        >
          <Box
            sx={{ width: '80px', height: '80px', backgroundColor: '#CAF8FF' }}
          ></Box>
          <Box
            sx={{
              position: 'absolute',
              fontFamily: 'Avenir Next',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: '14px',
              lineHeight: '20px',
              bottom: '30px',
              left: '95px',
            }}
          >
            Earth Changes and Journeys
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: '18px',
              right: 0,
            }}
          >
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
      >
        {options.map(({ label, id, icon, handleMenuClick }, idx) => (
          <MenuItem key={`${id}-idx`} onClick={() => handleMenuClick()}>
            <Grid container>
              <Grid item>{icon}</Grid>
              &nbsp;
              <Grid item>{label}</Grid>
            </Grid>
          </MenuItem>
        ))}
      </Menu>
      <CreateBoardPopup open={boardModal} closePopup={() => setBoardModal(false)} />
    </>
  );
}

export default Dashboard;
