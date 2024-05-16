import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import './Navbar.css'; // Import your custom CSS file

export default function Navbar() {
  return (
    <div className="navbar">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            className="menuIcon"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            className="title"
          >
            Stocks Overview
          </Typography>
          <div className="searchContainer">
            <div className="searchIconWrapper">
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              className="inputBase"
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
