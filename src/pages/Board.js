import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import PostsHeader from '../components/PostsHeader';
import PostCard from '../components/Card';
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
  const [board, setBoard] = useState({});

  useEffect(() => {
    const boards = JSON.parse(localStorage.getItem('boards'));
    if (!boards) {
      return;
    }
    const currentBoard = boards.find(b => b.id === id);
    if (!currentBoard) {
      return;
    }
    setBoard({...currentBoard});
  }, [id]);

  const savePost = (title, description, image) => {
    const postId = uuidv4();
    const boards = JSON.parse(localStorage.getItem('boards'));
    if (!boards) {
      return;
    }
    const index = boards.findIndex(p => p.id === id);
    if (index === -1) {
      return;
    } 
    const currentBoard = {...boards[index]};
    const post = {
      id: postId, 
      title,
      image,
      description,
      timestamp: new Date().toDateString(),
      likes: 0
    }
    currentBoard.posts.push(post);
    boards[index] = currentBoard;
    console.log(boards[index]);
    localStorage.setItem('boards', JSON.stringify(boards));
  };

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
        <Grid container spacing={2}>
          {board?.posts?.map(post => (
            <Grid item xs={4}>      
              <PostCard
                key={post.id}
                imageURL={post.image}
                content={post.description}
                title={post.title}
                subHeader={post.timestamp}
                likes={post.likes}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <PostPopup open={postPopup} closePopup={() => setPostPopup(false)} savePost={savePost}  />
    </>
  );
};

export default Board;
