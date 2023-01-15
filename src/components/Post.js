import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Grid, Menu, MenuItem } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

const ContentConatiner = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2),
}));

const Post = ({
  post,
  setPostIdToEdit,
  editPost,
  deletePost,
  togglePostBookmark,
  handleLikeClick,
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const onLikeClick = () => {
    handleLikeClick(post.id);
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
    editPost(post);
  };

  const deleteP = () => {
    handleClose();
    deletePost();
  };

  const options = [
    {
      label: 'Edit',
      id: 'edit-board',
      icon: <EditIcon />,
      handleMenuClick: edit,
      color: '#717171',
    },
    {
      label: 'Delete',
      id: 'delete-board',
      icon: <DeleteOutlineIcon />,
      handleMenuClick: deleteP,
      color: '#D33852',
    },
  ];

  return (
    <Card sx={{ maxWidth: 345 }}>
      <ContentConatiner>
        <CardHeader
          action={
            <div>
              <IconButton
                onClick={() => togglePostBookmark(post.id)}
                disableRipple
              >
                {post.isBookMarked ? (
                  <BookmarkIcon
                    sx={{
                      height: '17.5px',
                      width: '17.5px',
                      color: '#D33852',
                      marginLeft: '25px',
                    }}
                  />
                ) : (
                  <BookmarkBorderIcon
                    sx={{
                      height: '17.5px',
                      width: '17.5px',
                      color: '#B0B0B0',
                      marginLeft: '25px',
                    }}
                  />
                )}
              </IconButton>
              <IconButton onClick={(e) => handleClick(e, post.id)}>
                <MoreVertIcon />
              </IconButton>
            </div>
          }
          title={post.title}
          subheader={post.subHeader}
        />
        <CardMedia
          component="img"
          height="194"
          image={post.image}
          alt={post.title}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.content}
          </Typography>
        </CardContent>
        <hr />
        <CardActions disableSpacing>
          <IconButton onClick={onLikeClick}>
            <FavoriteIcon />
          </IconButton>
          <span>{post.likes}</span>
        </CardActions>
      </ContentConatiner>
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
    </Card>
  );
};

export default Post;
