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
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
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
  width: '284px',
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

// const StyledSearchIcon = styled(SearchIcon)

const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: '#FFFFFF',
  position: 'static',
}));

const ButtonWrapper = styled('div')(() => ({
  marginLeft: '80px',
}));

const CreateButton = styled(Button)(() => ({
  backgroundColor: '#D33852 !important',
  color: 'white',
}));

function Header() {
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
          <Search>
            <SearchIconWrapper>
              <SearchIcon color="#717171" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <ButtonWrapper>
            <CreateButton>
              <AddIcon
                sx={{ color: 'white', height: '16.25px', width: '16.25px' }}
              />
              Create new board
            </CreateButton>
          </ButtonWrapper>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
}

export default Header;
