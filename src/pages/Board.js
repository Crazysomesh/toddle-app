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

import BoardHeader from '../components/BoardHeader';
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
  const [postPopup, setPostPopup] = useState(false);
  const [board, setBoard] = useState({});
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const boards = JSON.parse(localStorage.getItem('boards'));
    if (boards) {
      const currentBoard = boards.find(b => b.id === id);
      if (currentBoard) {
        setBoard({...currentBoard});
        setFilteredPosts([...currentBoard.posts])
      }
    }
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
    setFilteredPosts([...currentBoard.posts]);
    boards[index] = currentBoard;
    localStorage.setItem('boards', JSON.stringify(boards));
  };

  const filterPosts = (str) => {
    let filteredData = [...board?.posts]
    if (str) filteredData = filteredData.filter((b) => b.title.toLowerCase().includes(str.toLowerCase()));
    setFilteredPosts([...filteredData]);
  };

  return (
    <>
      <BoardHeader board={board} filterPosts={filterPosts} />
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
          {filteredPosts.map(post => (
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
