import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import BoardHeader from '../components/BoardHeader';
import Post from '../components/Post';
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
  const [postIdToEdit, setPostIdToEdit] = useState(null);
  const [showBookMarked, setShowBookMarked] = useState(false);

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

  const editPost = () => {
    setBoardModal(true);
  };

  const togglePostBookmark = (postId) => {
    const boards = JSON.parse(localStorage.getItem('boards'));
    const index = boards.findIndex(p => p.id === id);
    boards[index].posts.forEach((p) => {
      if (p.id === postId) p.isBookMarked = !Boolean(p.isBookMarked);
    });
    setBoard({...boards[index]});
    localStorage.setItem('boards', JSON.stringify(boards));
  };

  const deletePost = () => {
    const newPostslist = board.posts.filter((p) => p.id !== postIdToEdit);
    const boards = JSON.parse(localStorage.getItem('boards'));
    const index = boards.findIndex(p => p.id === id);
    boards[index].posts = [...newPostslist];
    setBoard({...boards[index]});
    localStorage.setItem('boards', JSON.stringify(boards));
  };

  const savePost = (title, description, image) => {
    const postId = uuidv4();
    const boards = JSON.parse(localStorage.getItem('boards'));
    if (boards) {
      const index = boards.findIndex(p => p.id === id);
      if (index > -1) {
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
        setBoard({...currentBoard});
        localStorage.setItem('boards', JSON.stringify(boards));
        setPostPopup(false);
      } 
    }
  };

  const filterPosts = (str) => {
    let filteredData = [...board?.posts]
    if (str) filteredData = filteredData.filter((p) => p.title.toLowerCase().includes(str.toLowerCase()));
    if (showBookMarked) filteredData = filteredData.filter((p) => p.isBookMarked);
    setFilteredPosts([...filteredData]);
  };

  useEffect(() => {
    if (Object.keys(board).length > 0) filterPosts();
  }, [board, showBookMarked]);


  return (
    <Box sx={{ backgroundColor: '#EBFCFF', height: '100vh' }}>
      <BoardHeader board={board} filterPosts={filterPosts} showBookMarked={showBookMarked} setShowBookMarked={setShowBookMarked} />
      <Box sx={{ margin: '40px 72px 0px' }}>
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
            <Grid item xs={4} key={`${post.id}-container`}>      
              <Post
                key={post.id}
                post={post}
                setPostIdToEdit={setPostIdToEdit}
                editPost={editPost}
                deletePost={deletePost}
                togglePostBookmark={togglePostBookmark}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <PostPopup open={postPopup} closePopup={() => setPostPopup(false)} savePost={savePost}  />
    </Box>
  );
};

export default Board;
