import AddIcon from '@mui/icons-material/Add';
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
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import toddleIcon from '../assets/images/logo.svg';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#EBEBEB',
  '&:hover': {
    borderColor: '#EB4761',
  },
  marginRight: theme.spacing(10),
  width: theme.spacing(35.5),
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#000000',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: '#FFFFFF',
  position: 'static',
}));

const CreateButton = styled(Button)(() => ({
  backgroundColor: '#D33852',
  color: 'white',
  '&:hover': {
    backgroundColor: '#D33852',
  },
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
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}
          >
            <Box>
              <ChevronLeftIcon sx={{ color: '#717171', margin: '10px' }} />
            </Box>
            <img src={toddleIcon} alt="toddleIcon" />
            <Box sx={{ display: 'flex' }}>
              <Box
                sx={{
                  fontFamily: 'Avenir Next',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  fontSize: '18px',
                  lineHeight: '24px',
                  color: '#222222',
                  margin: '10px',
                }}
              >
                Places around the world
              </Box>
            </Box>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <SearchIcon
              sx={{
                height: '17.5px',
                width: '17.5px',
                color: '#B0B0B0',
              }}
            />
            <Box
              sx={{
                width: '1px',
                height: '18px',
                background: '#B0B0B0',
                marginLeft: '25px',
              }}
            />
            {/* <BookmarkIcon
              sx={{
                height: '17.5px',
                width: '17.5px',
                color: '#B0B0B0',
                marginLeft: '25px',
              }}
            /> */}
            <BookmarkBorderIcon
              sx={{
                height: '17.5px',
                width: '17.5px',
                color: '#B0B0B0',
                marginLeft: '25px',
              }}
            />
          </Box>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
}

export default PostsHeader;
