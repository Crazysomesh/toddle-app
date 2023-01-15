import * as React from 'react';
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
import { Box } from '@mui/material';

const ContentConatiner = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2),
}))

const Post = ({ imageURL, title, content, subHeader, likes }) => {
  const onLikeClick = () => {
    console.log('Like button clicked');
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
    <ContentConatiner>

    
      <CardHeader
        action={
          <div>
            <IconButton aria-label="bookmark">
              <BookmarkBorderIcon />
            </IconButton>
            <IconButton aria-label="settings">
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
        <IconButton aria-label="add to favorites" onClick={onLikeClick}>
          <FavoriteIcon />
        </IconButton>
        <span>{likes}</span>
      </CardActions>
      </ContentConatiner>
    </Card>
  );
}

export default Post;