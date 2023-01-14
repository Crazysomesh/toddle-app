import React from 'react';
import { useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
} from '@mui/material';

import PostsHeader from '../components/PostsHeader';
import PostCard from '../components/Card';
import { POSTS } from '../utils/constants';

const CreateButton = styled(Button)(() => ({
  backgroundColor: '#D33852',
  color: 'white',
  '&:hover': {
    backgroundColor: '#D33852',
  },
}));

const Board = () => {
  let { id } = useParams();
  console.log({ id });

  return (
    <>
      <PostsHeader />
      <Box sx={{ padding: '40px 72px 0px' }}>
        <Box>
          <h2>Your posts</h2>
        </Box>
        <Box>
          <CreateButton>
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
        </Box>
      </Box>
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
    </>
  );
};

export default Board;
