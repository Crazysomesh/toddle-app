import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Menu, MenuItem, Grid, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import BoardPopup from '../components/BoardPopup';
import Header from '../components/Header';
import { ROUTES } from '../utils/constants';

const BoardBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginTop: theme.spacing(4),
  height: theme.spacing(10),
  width: theme.spacing(45.5),
  border: '1px solid #EBEBEB',
  borderRadius: theme.spacing(1),
}));

const ColorBox = styled(Box)(({ theme, color }) => ({
  width: theme.spacing(10),
  height: theme.spacing(10),
  backgroundColor: color,
}));

const ContentBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  fontFamily: 'Avenir Next',
  fontStyle: 'normal',
  fontWeight: theme.spacing(62.5),
  fontSize: theme.spacing(1.75),
  lineHeight: theme.spacing(2.5),
  bottom: theme.spacing(3.75),
  left: theme.spacing(13),
  cursor: 'pointer',
}));

const ContainerBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5, 9, 0),
}));

const IconBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(2.25),
  right: 0,
}));

function Dashboard() {
  const navigate = useNavigate();
  const [boardModal, setBoardModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [boards, setBoards] = useState([]);
  const [filteredBoards, setFilteredBoards] = useState([]);
  const [boardIdToEdit, setBoardIdToEdit] = useState(null);

  useEffect(() => {
    let allBoards = localStorage.getItem('boards');
    if (!allBoards) localStorage.setItem('boards', JSON.stringify([]));
    allBoards = allBoards ? JSON.parse(allBoards) : [];
    setBoards([...allBoards]);
    setFilteredBoards([...allBoards]);

    return () => {};
  }, []);

  useEffect(() => setFilteredBoards([...boards]), [boards]);

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
  };

  const filterBoards = (str) => {
    let filteredData = [...boards];
    if (str)
      filteredData = filteredData.filter((b) =>
        b.title.toLowerCase().includes(str.toLowerCase())
      );
    setFilteredBoards([...filteredData]);
  };

  const saveBoard = (board) => {
    const allBoards = [...boards];
    if (!board.id) {
      board['id'] = uuidv4();
      allBoards.push({ ...board });
    } else {
      const index = allBoards.findIndex((b) => b.id === board.id);
      allBoards[index] = { ...board };
    }
    setBoards([...allBoards]);
    setBoardIdToEdit(null);
    localStorage.setItem('boards', JSON.stringify([...allBoards]));
  };

  const options = [
    {
      label: 'Edit',
      id: 'edit-board',
      icon: <EditIcon />,
      handleMenuClick: editBoard,
      color: '#717171',
    },
    {
      label: 'Delete',
      id: 'delete-board',
      icon: <DeleteOutlineIcon />,
      handleMenuClick: deleteBoard,
      color: '#D33852',
    },
  ];

  const openNewBoardPopup = () => {
    setBoardIdToEdit(null);
    setBoardModal(true);
  };

  return (
    <>
      <Header newBoard={openNewBoardPopup} filterBoards={filterBoards} />
      <ContainerBox>
        <Box>
          <h2>My Boards</h2>
        </Box>
        <Grid container spacing={2}>
          {filteredBoards.map((board) => (
            <Grid item xs={4} key={board.id}>
              <BoardBox key={board.id}>
                <ColorBox color={board.color}></ColorBox>
                <ContentBox
                  onClick={() =>
                    navigate(ROUTES.BOARD.replace(':id', board.id))
                  }
                >
                  {board.title}
                </ContentBox>
                <IconBox>
                  <IconButton onClick={(e) => handleClick(e, board.id)}>
                    <MoreVertIcon />
                  </IconButton>
                </IconBox>
              </BoardBox>
            </Grid>
          ))}
          {filteredBoards.length === 0 && (
            <Typography variant="h6">
              Create a new board by clicking on the &apos;+&apos; button above
            </Typography>
          )}
        </Grid>
      </ContainerBox>
      <Menu anchorEl={anchorEl} open={openMenu} onClose={handleClose}>
        {options.map(({ label, id, icon, handleMenuClick, color }, idx) => (
          <MenuItem key={`${id}-${idx}`} onClick={() => handleMenuClick()}>
            <Grid container style={{ color }} alignItems="center">
              <Grid item>{icon}</Grid>
              &nbsp;
              <Grid item>{label}</Grid>
            </Grid>
          </MenuItem>
        ))}
      </Menu>
      <BoardPopup
        open={boardModal}
        closePopup={() => setBoardModal(false)}
        saveBoard={saveBoard}
        boardIdToEdit={boardIdToEdit}
      />
    </>
  );
}

export default Dashboard;
