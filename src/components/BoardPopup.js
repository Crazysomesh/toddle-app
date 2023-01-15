import { Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';

import { COLORS } from '../utils/constants';

import Popup from './Popup';

const PlaceAroundInput = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    borderColor: '#EB4761',
  },
  marginRight: theme.spacing(10),
  width: '100%',
}));

const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: '#000000',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1),
    backgroundColor: 'white',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const BoardPopup = ({ open, closePopup, saveBoard, boardIdToEdit }) => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    const allBoards = JSON.parse(localStorage.getItem('boards'));
    if (allBoards) {
      const board = allBoards.find((b) => b.id === boardIdToEdit);
      console.log({ board });
      setTitle(board?.title || '');
      setColor(board?.color || '');
    }
  }, [boardIdToEdit]);

  const handleSubmit = () => {
    const board = {
      title,
      color,
      posts: [],
    };
    if (boardIdToEdit !== '') {
      board['id'] = boardIdToEdit;
    }
    saveBoard(board);
    closePopup();
  };

  return (
    <Popup
      title="Add a name for your board"
      open={open}
      closePopup={closePopup}
      actionButtonHandler={handleSubmit}
      actionButtonText={boardIdToEdit === '' ? 'Create board' : 'Edit board'}
      content={
        <>
          <Box>
            <PlaceAroundInput>
              <StyledInputBase
                placeholder="Board title"
                inputProps={{ 'aria-label': 'PlaceAroundInput' }}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </PlaceAroundInput>
          </Box>
          <Box>
            <Box
              sx={{
                marginTop: '40px',
                fontFamily: 'Avenir Next',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '20px',
                lineHeight: '28px',
              }}
            >
              Select Post Color
            </Box>
            <Box
              sx={{
                fontFamily: 'Avenir Next',
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '20px',
              }}
            >
              Here are some templates to help you get started
            </Box>
            <Box sx={{ marginTop: '16px', display: 'flex' }}>
              {COLORS.map((c) => (
                <Box
                  key={c}
                  sx={{
                    boxSizing: 'border-box',
                    width: '24.05px',
                    height: '24.05px',
                    background: c,
                    border: c === color ? '1.5px solid #23856D' : 'none',
                    borderRadius: '50%',
                    marginRight: '10px',
                    cursor: 'pointer',
                  }}
                  onClick={() => setColor(c)}
                ></Box>
              ))}
            </Box>
          </Box>
        </>
      }
    />
  );
};

export default BoardPopup;
