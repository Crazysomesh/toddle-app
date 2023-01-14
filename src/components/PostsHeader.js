import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  InputBase,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import toddleIcon from '../assets/images/toddle-logo.svg';

const Icon = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#EBEBEB',
  '&:hover': {
    borderColor: '#EB4761',
  },
  marginRight: theme.spacing(10),
  width: theme.spacing(35.5),
}));

const IconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: '#FFFFFF',
  position: 'static',
}));

function PostsHeader() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <Icon>
                <IconWrapper>
                    <ChevronLeftIcon />
                </IconWrapper>
            </Icon>
            <img src={toddleIcon} alt="toddleIcon" />
            <span>Places around the world</span>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Icon>
              <IconWrapper>
                <SearchIcon color="#717171" />
              </IconWrapper>
            </Icon>
            <Icon>
            <IconWrapper>
                <BookmarkBorderIcon color="#717171" />
              </IconWrapper>
            </Icon>
          </Box>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
}

export default PostsHeader;
