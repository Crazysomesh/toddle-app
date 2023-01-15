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
  },
}));

const ColorPickerTitle = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(5),
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: theme.spacing(2.5),
  lineHeight: theme.spacing(3.5),
}));

const ColorPickerText = styled(Box)(({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: theme.spacing(1.75),
  lineHeight: theme.spacing(2.5),
}));

const ColorPickerContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing,
  display: 'flex',
}));

const Color = styled(Box)(({ theme, color, selectedColor }) => ({
  boxSizing: 'border-box',
  width: theme.spacing(3),
  height: theme.spacing(3),
  background: color,
  border: color === selectedColor ? '1.5px solid #23856D' : 'none',
  borderRadius: '50%',
  marginRight: theme.spacing(1.25),
  cursor: 'pointer',
}));

const BoardPopup = ({ open, closePopup, saveBoard, boardIdToEdit }) => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    const allBoards = JSON.parse(localStorage.getItem('boards'));
    if (allBoards) {
      const board = allBoards.find((b) => b.id === boardIdToEdit);
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
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </PlaceAroundInput>
          </Box>
          <Box>
            <ColorPickerTitle>Select Post Color</ColorPickerTitle>
            <ColorPickerText>
              Here are some templates to help you get started
            </ColorPickerText>
            <ColorPickerContainer>
              {COLORS.map((c) => (
                <Color
                  key={c}
                  selectedColor={color}
                  color={c}
                  onClick={() => setColor(c)}
                />
              ))}
            </ColorPickerContainer>
          </Box>
        </>
      }
    />
  );
};

export default BoardPopup;
