import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Box, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  Menu,
  MenuItem
} from '@mui/material';

const ContentConatiner = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2),
}))

const Post = ({ post, imageURL, title, content, subHeader, likes, setPostIdToEdit, editPost, deletePost }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const onLikeClick = () => {
    console.log('Like button clicked');
  };

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
    setPostIdToEdit(id);
  };

  const handleClose = () => {
    setOpenMenu(false);
    setAnchorEl(null);
  };

  const edit = () => {
    handleClose();
    editPost();
  };

  const deleteP = () => {
    handleClose();
    deletePost();
  }

  const options = [
    {
      label: 'Edit',
      id: 'edit-board',
      icon: <EditIcon />,
      handleMenuClick: edit,
      color: '#717171'
    },
    {
      label: 'Delete',
      id: 'delete-board',
      icon: <DeleteOutlineIcon />,
      handleMenuClick: deleteP,
      color: '#D33852'
    }
  ]

  return (
    <Card sx={{ maxWidth: 345 }}>
    <ContentConatiner>
      <CardHeader
        action={
          <div>
            <IconButton>
              <BookmarkBorderIcon />
            </IconButton>
            <IconButton onClick={(e) => handleClick(e, post.id)}>
              <MoreVertIcon />
            </IconButton>
          </div>
        }
        title={title}
        subheader={subHeader}
      />
      <CardMedia
        component="img"
        height="194"
        image={imageURL}
        alt={title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <hr />
      <CardActions disableSpacing>
        <IconButton onClick={onLikeClick}>
          <FavoriteIcon />
        </IconButton>
        <span>{likes}</span>
      </CardActions>
      </ContentConatiner>
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
      >
        {options.map(({ label, id, icon, handleMenuClick, color }, idx) => (
          <MenuItem key={`${id}-${idx}`} onClick={() => handleMenuClick()}>
            <Grid container style={{ color }} alignItems='center'>
              <Grid item>{icon}</Grid>
              &nbsp;
              <Grid item>{label}</Grid>
            </Grid>
          </MenuItem>
        ))}
      </Menu>
    </Card>
  );
}

export default Post;