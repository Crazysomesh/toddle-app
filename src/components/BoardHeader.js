import AddIcon from '@mui/icons-material/Add';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  InputBase,
  Button,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import toddleIcon from '../assets/images/logo.svg';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate } from "react-router-dom";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#EBEBEB',
  '&:hover': {
    borderColor: '#EB4761',
  },
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

const BackIcon = styled(ChevronLeftIcon)(() => ({
  cursor: 'pointer',
}))

const BoardHeader = ({ board, filterPosts }) => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState(null);
  const [showBookmarked, setShowBookmarked] = useState(false);

  const onMouseLeave = () => {
    setShowSearch(Boolean(search?.trim) && search !== '');
  }

  const handleSearch = (event) => {
    const str = event?.target?.value
    setSearch(str);
    filterPosts(str);
  }

  const handleBookmarkToggle = () => {
    setShowBookmarked((val) => !val);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}
          >
            <BackIcon sx={{ color: '#717171', margin: '10px' }} onClick={() => navigate('/')} />
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
                {board.title}
              </Box>
            </Box>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Box onMouseEnter={() => setShowSearch(true)} onMouseLeave={() => onMouseLeave()}>
              {
                showSearch ? (
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon color="#717171" />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ 'aria-label': 'search' }}
                      onChange={handleSearch}
                    />
                  </Search>
                ) : (
                  <IconButton>
                    <SearchIcon
                      sx={{
                        height: '17.5px',
                        width: '17.5px',
                        color: '#B0B0B0',
                      }}
                    />
                  </IconButton>
                )
              }
            </Box>
            <Box
              sx={{
                width: '1px',
                height: 'auto',
                background: '#B0B0B0',
                marginLeft: '25px',
              }}
            />
            <IconButton onClick={handleBookmarkToggle} disableRipple>
              {
                showBookmarked ? (
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
                )
              }
            </IconButton>
          </Box>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
}

export default BoardHeader;
