import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SearchIcon from '@mui/icons-material/Search';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import toddleIcon from '../assets/images/logo.svg';

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
    paddingLeft: theme.spacing(6),
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: '#FFFFFF',
  position: 'static',
}));

const BackIcon = styled(ChevronLeftIcon)(({ theme }) => ({
  cursor: 'pointer',
  color: '#717171',
  margin: theme.spacing(1.25),
}));

const TitleContainer = styled(Box)(() => ({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: theme.spacing(2.25),
  lineHeight: theme.spacing(3),
  color: '#222222',
  margin: theme.spacing(1.25),
  display: 'flex',
}));

const ActionContainer = styled(Box)(() => ({
  display: 'flex',
}));

const SearchPlaceholder = styled(SearchIcon)(({ theme }) => ({
  height: theme.spacing(2.25),
  width: theme.spacing(2.25),
  color: '#B0B0B0',
}));

const VerticalLine = styled(Box)(({ theme }) => ({
  width: '1px',
  height: 'auto',
  background: '#B0B0B0',
  marginLeft: theme.spacing(3),
}));

const BookmarkEmpty = styled(BookmarkBorderIcon)(({ theme }) => ({
  height: theme.spacing(2.25),
  width: theme.spacing(2.25),
  color: '#B0B0B0',
  marginLeft: theme.spacing(3),
}));

const Bookmark = styled(BookmarkIcon)(({ theme }) => ({
  height: theme.spacing(2.25),
  width: theme.spacing(2.25),
  color: '#D33852',
  marginLeft: theme.spacing(3),
}));

const BoardHeader = ({
  board,
  filterPosts,
  showBookMarked,
  setShowBookMarked,
}) => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState(null);

  const onMouseLeave = () => {
    setShowSearch(Boolean(search?.trim) && search !== '');
  };

  const handleSearch = (event) => {
    const str = event?.target?.value;
    setSearch(str);
    filterPosts(str);
  };

  const handleBookmarkToggle = () => {
    setShowBookMarked((val) => !val);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar>
        <Toolbar>
          <TitleContainer>
            <BackIcon onClick={() => navigate('/')} />
            <img src={toddleIcon} alt="toddleIcon" />
            <Title>{board.title}</Title>
          </TitleContainer>
          <Box sx={{ flexGrow: 1 }} />
          <ActionContainer>
            <Box
              onMouseEnter={() => setShowSearch(true)}
              onMouseLeave={() => onMouseLeave()}
            >
              {showSearch ? (
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon color="#717171" />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    onChange={handleSearch}
                  />
                </Search>
              ) : (
                <IconButton>
                  <SearchPlaceholder />
                </IconButton>
              )}
            </Box>
            <VerticalLine />
            <IconButton onClick={handleBookmarkToggle} disableRipple>
              {showBookMarked ? <Bookmark /> : <BookmarkEmpty />}
            </IconButton>
          </ActionContainer>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
};

export default BoardHeader;
