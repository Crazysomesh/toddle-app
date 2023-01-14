import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Grid,
  Typography,
} from '@mui/material';

import PostsHeader from '../components/PostsHeader';
import PostCard from '../components/Card';
import { POSTS } from '../utils/constants';
import PostPopup from '../components/PostPopup';

const CreateButton = styled(Button)(() => ({
  backgroundColor: '#D33852',
  color: 'white',
  '&:hover': {
    backgroundColor: '#D33852',
  },
}));

const Board = () => {
  const { id } = useParams();
  console.log({ id });
  const [postPopup, setPostPopup] = useState(false);

  return (
    <>
      <PostsHeader />
      <Box sx={{ padding: '40px 72px 0px' }}>
        <Grid container justifyContent='space-between'>
          <Grid item>
            <Typography variant='h4'>Your posts</Typography>
          </Grid>
          <Grid item>
            <CreateButton onClick={() => setPostPopup(true)}>
              <AddIcon
                sx={{
                  color: 'white',
                  height: '16px',
                  width: '16px',
                  marginRight: '4px',
                }}
              />
              Create new post
            </CreateButton>
          </Grid>
        </Grid>
        {POSTS.map(post => (
          <PostCard
            key={post.title}
            imageURL={post.imageURL}
            content={post.content}
            title={post.title}
            subHeader={post.subHeader}
            likes={post.likes}
          />
        ))}
      </Box>
      <PostPopup open={postPopup} closePopup={() => setPostPopup(false)}  />
    </>
  );
};

export default Board;
