import React, { useState } from 'react';
import Popup from './Popup';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
	Typography
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';

const PlaceAroundInput = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	'&:hover': {
		borderColor: '#EB4761',
	},
	marginRight: theme.spacing(10),
	width: '100%'
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
	color: '#000000',
	width: '100%',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1),
		backgroundColor: 'white',
		width: '100%',
	},
}));

const ImageContainer = styled(Box)(({ theme }) => ({
	marginTop: theme.spacing(2)
}));

const ImageUploader = styled(Button)(({ theme }) => ({
	color: '#717171',
	marginTop: theme.spacing(2),
	borderColor: '#EBEBEB',
	fontSize: theme.spacing(1.75),
	lineHeight: theme.spacing(2.5),
	fontWeight: 600,
	width: theme.spacing(25),
	display: 'flex',
	justifyContent: 'space-between',
	'&:hover': {
		borderColor: '#000000',
	}
}));

const DescriptionField = styled(StyledTextField)(({ theme }) => ({
	'& .MuiInputBase-input': {
		padding: theme.spacing(1),
		height: theme.spacing(9.5),
		width: '100%',
	},
}));

const PostPopup = ({ open, closePopup, postIdToEdit }) => {
  const [subject, setSubject] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState('');

	const addImage = (e) => {
		const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
		reader.onloadend = () => setImage(reader.result);;
		setImage(file);
	}

	return (
		<Popup open={open} title='Create a post' helperText='Write something for your post' actionButtonText='Publish'
		closePopup={closePopup}
		content={
			<>
				<Typography variant='h6' fontWeight='600'>Subject</Typography>
				<PlaceAroundInput>
					<StyledTextField
						placeholder="Post title"
            onChange={(e) => setSubject(e.target.value)}
            value={subject}
					/>
				</PlaceAroundInput>
				<ImageContainer>
					{
						image ? (
							<img src={image} width='50%' />
						) : (
							<>
								<input
									accept="image/*"
									style={{ display: 'none'}}
									id="contained-button-file"
									type="file"
									onChange={addImage}
								/>
								<label htmlFor="contained-button-file">
									<ImageUploader component="span" variant='outlined' >
										<CropOriginalIcon /> Add your image
									</ImageUploader>
								</label>
							</>
						)
					}
				</ImageContainer>
				<hr style={{ margin: '30px 0px'}}/>
				<Typography variant='h6' fontWeight='600'>What's on your mind?</Typography>
				<PlaceAroundInput>
					<DescriptionField
						placeholder="Type here"
						multiline
            onChange={(e) => setDescription(e.target.value)}
            value={description}
					/>
				</PlaceAroundInput>
			</>}
		/>
	)
};

export default PostPopup;