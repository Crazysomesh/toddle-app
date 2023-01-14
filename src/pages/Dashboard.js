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
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";

import Header from '../components/Header';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import CreateBoardPopup from '../components/CreateBoardPopup';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function Dashboard() {
  const navigate = useNavigate();
  const [boardModal, setBoardModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [boards, setBoards] = useState([]);
  const [boardIdToEdit, setBoardIdToEdit] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('boards')) {
      localStorage.setItem('boards', JSON.stringify([]));
    }
    const allBoards = JSON.parse(localStorage.getItem('boards'));
    setBoards([...allBoards]);
  }, []);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
    setBoardIdToEdit(id);
  };

  const handleClose = () => {
    setOpenMenu(false);
    setAnchorEl(null);
  };

  const editBoard = () => {
    handleClose();
    setBoardModal(true);
  };

  const deleteBoard = () => {
    const newBoardList = boards.filter((b) => b.id !== boardIdToEdit);
    setBoards([...newBoardList]);
    localStorage.setItem('boards', JSON.stringify([...newBoardList]));
    handleClose();
  }

  const saveBoard = (board) => {
    const allBoards = [...boards];
    if (!board.id) {
      board['id'] = uuidv4();
      allBoards.push({...board});
    } else {
      const index = allBoards.findIndex(b => b.id === board.id);
      allBoards[index] = {...board};
    }
    setBoards([...allBoards]);
    localStorage.setItem('boards', JSON.stringify([...allBoards]));
  };

  const options = [
    {
      label: 'Edit',
      id: 'edit-board',
      icon: <EditIcon />,
      handleMenuClick: editBoard,
      color: '#717171'
    },
    {
      label: 'Delete',
      id: 'delete-board',
      icon: <DeleteOutlineIcon />,
      handleMenuClick: deleteBoard,
      color: '#D33852'
    }
  ]

  const onButtonClick = () => {
    setBoardIdToEdit('');
    setBoardModal(true);
  };

  return (
    <>
      <Header newBoard={onButtonClick} />
      <Box sx={{ padding: '40px 72px 0px' }}>
        <Box>
          <h2>My Boards</h2>
        </Box>
        <Grid container spacing={2}>
          {boards.map(board => (
            <Grid item xs={4}>
              <Box
                key={board.id}
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
                  sx={{ width: '80px', height: '80px', backgroundColor: board.color }}
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
                    left: '104px',
                    cursor: 'pointer'
                  }}
                  onClick={() => navigate(`/board/${board.id}`)}
                >
                  {board.title}
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: '18px',
                    right: 0,
                  }}
                >
                  <IconButton onClick={(e) => handleClick(e, board.id)}>
                    <MoreVertIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
      >
        {options.map(({ label, id, icon, handleMenuClick, color }, idx) => (
          <MenuItem key={`${id}-idx`} onClick={() => handleMenuClick()}>
            <Grid container style={{ color }} alignItems='center'>
              <Grid item>{icon}</Grid>
              &nbsp;
              <Grid item>{label}</Grid>
            </Grid>
          </MenuItem>
        ))}
      </Menu>
      <CreateBoardPopup
        open={boardModal}
        closePopup={() => setBoardModal(false)}
        saveBoard={saveBoard}
        boardIdToEdit={boardIdToEdit}
      />
    </>
  );
}

export default Dashboard;
