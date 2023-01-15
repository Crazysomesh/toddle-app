import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import BoardEmptyState from '../components/BoardEmptyState';
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

const BoardContainer = styled(Box)(() => ({
  backgroundColor: '#EBFCFF',
  height: '100vh',
}));

const StyledAddIcon = styled(AddIcon)(({ theme }) => ({
  color: 'white',
  height: theme.spacing(2),
  width: theme.spacing(2),
  marginRight: theme.spacing(0.5),
}));

const GridContainer = styled(Box)(({ theme }) => ({
  margin: theme.spacing(5, 9, 0),
  height: 'calc(100% - 130px)',
}));

const BoardGridContainer = styled(Grid)(({ theme }) => ({
  height: '100%',
  paddingTop: theme.spacing(1.25),
}));

const Board = () => {
  const { id } = useParams();
  const [postPopup, setPostPopup] = useState(false);
  const [board, setBoard] = useState({});
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [postIdToEdit, setPostIdToEdit] = useState(null);
  const [showBookMarked, setShowBookMarked] = useState(false);
  const [postSelected, setPostSelected] = useState({});

  useEffect(() => {
    const boards = JSON.parse(localStorage.getItem('boards'));
    if (boards) {
      const currentBoard = boards.find((b) => b.id === id);
      if (currentBoard) {
        setBoard({ ...currentBoard });
        setFilteredPosts([...currentBoard.posts]);
      }
    }
  }, [id]);

  const editPost = (post) => {
    setPostPopup(true);
    setPostSelected({ ...post });
  };

  const togglePostBookmark = (postId) => {
    const boards = JSON.parse(localStorage.getItem('boards'));
    const index = boards.findIndex((p) => p.id === id);
    boards[index].posts.forEach((p) => {
      if (p.id === postId) p.isBookMarked = !p.isBookMarked;
    });
    setBoard({ ...boards[index] });
    localStorage.setItem('boards', JSON.stringify(boards));
  };

  const deletePost = () => {
    const newPostslist = board.posts.filter((p) => p.id !== postIdToEdit);
    const boards = JSON.parse(localStorage.getItem('boards'));
    const index = boards.findIndex((p) => p.id === id);
    boards[index].posts = [...newPostslist];
    setBoard({ ...boards[index] });
    localStorage.setItem('boards', JSON.stringify(boards));
  };

  const editPostSave = (post) => {
    const boards = JSON.parse(localStorage.getItem('boards'));
    const currentBoardIndex = boards.findIndex((p) => p.id === id);
    const currentBoard = { ...boards[currentBoardIndex] };
    const currentPostIndex = currentBoard.posts.findIndex(
      (p) => p.id === post.id
    );
    currentBoard.posts[currentPostIndex] = { ...post };
    boards[currentBoardIndex] = { ...currentBoard };
    setBoard({ ...boards[currentBoardIndex] });
    localStorage.setItem('boards', JSON.stringify([...boards]));
    setPostPopup(false);
  };

  const savePost = (title, description, image) => {
    const postId = uuidv4();
    const boards = JSON.parse(localStorage.getItem('boards'));
    if (boards) {
      const index = boards.findIndex((p) => p.id === id);
      if (index > -1) {
        const currentBoard = { ...boards[index] };
        const post = {
          id: postId,
          title,
          image,
          description,
          timestamp: new Date().toDateString(),
          likes: 0,
        };
        currentBoard.posts.push(post);
        boards[index] = currentBoard;
        setBoard({ ...currentBoard });
        localStorage.setItem('boards', JSON.stringify(boards));
        setPostPopup(false);
      }
    }
  };

  const filterPosts = (str) => {
    const posts = board?.posts ? board.posts : [];
    let filteredData = [...posts];
    if (str)
      filteredData = filteredData.filter((p) =>
        p.title.toLowerCase().includes(str.toLowerCase())
      );
    if (showBookMarked)
      filteredData = filteredData.filter((p) => p.isBookMarked);
    setFilteredPosts([...filteredData]);
  };

  useEffect(() => {
    if (Object.keys(board).length > 0) filterPosts();
  }, [board, showBookMarked]);

  const handleLikeClick = (postId) => {
    const boards = JSON.parse(localStorage.getItem('boards'));
    if (boards) {
      const currentBoardIndex = boards.findIndex((b) => b.id === id);
      if (currentBoardIndex > -1) {
        const currentPostIndex = boards[currentBoardIndex].posts.findIndex(
          (p) => p.id === postId
        );
        if (currentPostIndex > -1) {
          const currentPost = {
            ...boards[currentBoardIndex].posts[currentPostIndex],
          };
          currentPost.likes = currentPost.likes + 1;
          boards[currentBoardIndex].posts[currentPostIndex] = {
            ...currentPost,
          };
          localStorage.setItem('boards', JSON.stringify(boards));
          setBoard({ ...boards[currentBoardIndex] });
        }
      }
    }
  };

  return (
    <BoardContainer>
      <BoardHeader
        board={board}
        filterPosts={filterPosts}
        showBookMarked={showBookMarked}
        setShowBookMarked={setShowBookMarked}
      />
      <GridContainer>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="h4">Your posts</Typography>
          </Grid>
          <Grid item>
            <CreateButton onClick={() => setPostPopup(true)}>
              <StyledAddIcon />
              Create new post
            </CreateButton>
          </Grid>
        </Grid>
        <BoardGridContainer container spacing={2}>
          {filteredPosts.map((post) => (
            <Grid item xs={3} key={`${post.id}-container`}>
              <Post
                key={post.id}
                post={post}
                setPostIdToEdit={setPostIdToEdit}
                editPost={editPost}
                deletePost={deletePost}
                togglePostBookmark={togglePostBookmark}
                handleLikeClick={handleLikeClick}
              />
            </Grid>
          ))}
          {filteredPosts.length === 0 && <BoardEmptyState />}
        </BoardGridContainer>
      </GridContainer>
      <PostPopup
        open={postPopup}
        closePopup={() => setPostPopup(false)}
        savePost={savePost}
        post={postSelected}
        editPostSave={editPostSave}
      />
    </BoardContainer>
  );
};

export default Board;
