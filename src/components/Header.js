import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Box, Toolbar, InputBase, Button } from '@mui/material';
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
    paddingLeft: theme.spacing(6),
    transition: theme.transitions.create('width'),
    width: '100%',
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

const LogoContainer = styled(Box)(() => ({
  flexGrow: 1,
  display: 'block',
}));

const ActionContainer = styled(Box)(() => ({
  display: 'flex',
}));

const PlusIcon = styled(AddIcon)(({ theme }) => ({
  color: 'white',
  height: theme.spacing(2),
  width: theme.spacing(2),
  marginRight: theme.spacing(0.5),
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
          <LogoContainer>
            <img src={toddleIcon} alt="toddleIcon" />
          </LogoContainer>
          <Box sx={{ flexGrow: 1 }} />
          <ActionContainer>
            <Search>
              <SearchIconWrapper>
                <SearchIcon color="#717171" />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" onChange={handleSearch} />
            </Search>
            <CreateButton onClick={newBoard}>
              <PlusIcon />
              Create new board
            </CreateButton>
          </ActionContainer>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
};

export default Header;
