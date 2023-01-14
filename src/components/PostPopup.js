import React, { useState } from 'react';
import Popup from './Popup';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

const PlaceAroundInput = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	'&:hover': {
		borderColor: '#EB4761',
	},
	marginRight: theme.spacing(10),
	width: theme.spacing(50),
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

const PostPopup = ({ open, closePopup, postIdToEdit }) => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');

	return (
		<Popup open={open} title='Hello' />
	)
};

export default PostPopup;