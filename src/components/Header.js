import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
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

import toddleIcon from '../assets/images/toddle-logo.svg';

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

const Header = ({ newBoard, filterBoards }) => {
  const handleSearch = (e) => {
    const str = e?.target?.value || '';
    filterBoards(str.trim());
  };

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
            <img src={toddleIcon} alt="toddleIcon" />
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
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
            <CreateButton onClick={newBoard}>
              <AddIcon
                sx={{
                  color: 'white',
                  height: '16px',
                  width: '16px',
                  marginRight: '4px',
                }}
              />
              Create new board
            </CreateButton>
          </Box>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
};

export default Header;
