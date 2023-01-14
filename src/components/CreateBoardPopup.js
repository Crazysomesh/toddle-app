import React from 'react';
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
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		backgroundColor: 'white',
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));

const CreateBoardPopup = ({ open, closePopup }) => {
	return (
		<Popup
			title="Add a name for your board"
			open={open}
			closePopup={closePopup}
			actionButtonHandler={closePopup}
			actionButtonText="Create board"
			content={
			<><Box>
				<PlaceAroundInput>
					<StyledInputBase
						placeholder="Places around the world"
						inputProps={{ 'aria-label': 'PlaceAroundInput' }}
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
				<Box sx={{ marginTop:'16px', display: 'flex' }}>
					<Box
						sx={{
							boxSizing: 'border-box',
							width: '24.05px',
							height: '24.05px',
							background: '#A7F0F9',
							border: '1.5px solid #23856D',
							borderRadius: '50%',
							marginRight: '10px'
						}}
					></Box>
					<Box
						sx={{
							boxSizing: 'border-box',
							width: '24.05px',
							height: '24.05px',
							background: '#C5C5FC',
							border: '1.5px solid #23856D',
							borderRadius: '50%',
							marginRight: '10px'
						}}
					></Box>
					<Box
						sx={{
							boxSizing: 'border-box',
							width: '24.05px',
							height: '24.05px',
							background: '#FFAEC0',
							border: '1.5px solid #23856D',
							borderRadius: '50%',
							marginRight: '10px'
						}}
					></Box>
					<Box
						sx={{
							boxSizing: 'border-box',
							width: '24.05px',
							height: '24.05px',
							background: '#FFCC66',
							border: '1.5px solid #23856D',
							borderRadius: '50%',
							marginRight: '10px'
						}}
					></Box>
				</Box>
			</Box>
			</>}
		/>
	)
};

export default CreateBoardPopup;