import React, { useEffect, useState } from 'react';
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
import CancelIcon from '@mui/icons-material/Cancel';

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

const ImageWrapper = styled(Box)(({ theme }) => ({
	marginTop: theme.spacing(2)
}));

const CancelButton = styled(CancelIcon)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(-1.25),
  right: theme.spacing(-1.75),
    cursor: 'pointer',
    color: '#D33852'
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

const ImageContainer = styled(Box)(() => ({
  position: 'relative',
  width: '50%'
}))

const PostPopup = ({ open, closePopup, savePost, post, editPostSave }) => {
  const [subject, setSubject] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState('');

  useEffect(() => {
    if (post) {
      setSubject(post.title);
      setDescription(post.description);
      setImage(post.image);
    }
  }, [post]);

	const addImage = (e) => {
		const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
		reader.onloadend = () => setImage(reader.result);;
		setImage(file);
	}

  const handlePostSave = () => {
    if (post) {
      post.title = subject;
      post.description = description;
      post.image = image;
      editPostSave(post);
    } else {
      savePost(
        subject,
        description,
        image
      );
    }
  };

  const deleteImage = () => {
    setImage('');
  };

	return (
		<Popup
      open={open}
      title='Create a post'
      helperText='Write something for your post'
      actionButtonText={!post ? 'Publish' : 'Update'}
		  closePopup={closePopup}
      actionButtonHandler={handlePostSave}
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
          <ImageWrapper>
            {
              image ? (
                <ImageContainer>
                  <img src={image} style={{ width: '100%',
  display: 'block',
  objectFit: 'cover'}} />
                <CancelButton onClick={deleteImage}/>
                </ImageContainer>
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
          </ImageWrapper>
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
        </>
      }
		/>
	)
};

export default PostPopup;