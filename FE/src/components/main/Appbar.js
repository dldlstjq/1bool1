import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../../common/logo.png';
import { Link } from 'react-router-dom';

// const pages = ['편의점', '레시피', '커뮤니티', '이벤트'];
const settings = ['로그인'];

function Appbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function logout(e) {
    e.preventDefault();
    localStorage.removeItem('email');
    localStorage.removeItem('user_id');
  }
  return (
    <AppBar
      position='static'
      style={{ backgroundColor: 'white', boxShadow: 'rgb(249, 61, 89) 0px 2px' }}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{ mr: 2, mt: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link to='/'>
              <img src={logo} alt='logo' style={{ height: '5rem' }} />
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              // color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to='/store' style={{ textDecoration: 'none' }}>
                  <Button style={{ color: 'black', fontSize: '1rem', fontWeight: 'bold' }}>
                    편의점
                  </Button>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to='/' style={{ textDecoration: 'none' }}>
                  <Button style={{ color: 'black', fontSize: '1rem', fontWeight: 'bold' }}>
                    레시피
                  </Button>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to='/' style={{ textDecoration: 'none' }}>
                  <Button style={{ color: 'black', fontSize: '1rem', fontWeight: 'bold' }}>
                    커뮤니티
                  </Button>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to='/' style={{ textDecoration: 'none' }}>
                  <Button style={{ color: 'black', fontSize: '1rem', fontWeight: 'bold' }}>
                    이벤트
                  </Button>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to='/' style={{ textDecoration: 'none' }}>
                  <Button style={{ color: 'black', fontSize: '1rem', fontWeight: 'bold' }}>
                    공지사항
                  </Button>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Link to='/'>
              <img src={logo} alt='logo' style={{ height: '4rem' }} />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link
              to='/store'
              style={{
                textDecoration: 'none',
                marginRight: '2rem',
                marginLeft: '6rem',
                hoverColor: 'red',
              }}
            >
              <Button style={{ my: 2, color: 'black', fontSize: '1.2rem', fontWeight: 'bold' }}>
                편의점
              </Button>
            </Link>
            <Link
              to='/'
              style={{
                textDecoration: 'none',
                marginRight: '2rem',
                marginLeft: '2rem',
                hoverColor: 'red',
              }}
            >
              <Button style={{ my: 2, color: 'black', fontSize: '1.2rem', fontWeight: 'bold' }}>
                레시피
              </Button>
            </Link>
            <Link
              to='/community'
              style={{
                textDecoration: 'none',
                marginRight: '2rem',
                marginLeft: '2rem',
                hoverColor: 'red',
              }}
            >
              <Button style={{ my: 2, color: 'black', fontSize: '1.2rem', fontWeight: 'bold' }}>
                커뮤니티
              </Button>
            </Link>
            <Link
              to='/'
              style={{
                textDecoration: 'none',
                marginRight: '2rem',
                marginLeft: '2rem',
                hoverColor: 'red',
              }}
            >
              <Button style={{ my: 2, color: 'black', fontSize: '1.2rem', fontWeight: 'bold' }}>
                이벤트
              </Button>
            </Link>
            <Link to='/' style={{ textDecoration: 'none', marginLeft: '2rem', hoverColor: 'red' }}>
              <Button style={{ my: 2, color: 'black', fontSize: '1.2rem', fontWeight: 'bold' }}>
                공지사항
              </Button>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  {setting === '로그인' && localStorage.getItem('email') === null && (
                    <Link to='/signin' style={{ textDecoration: 'none' }}>
                      <Typography textAlign='center'>{setting}</Typography>
                    </Link>
                  )}
                  {localStorage.getItem('email') && (
                    <Typography textAlign='center' onClick={logout}>
                      로그아웃
                    </Typography>
                  )}
                  {/* {setting === '회원가입' && (
                    <Link to='/signup' style={{ textDecoration: 'none' }}>
                      <Typography textAlign='center'>{setting}</Typography>
                    </Link>
                  )} */}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <Box>
            {localStorage.getItem('email') && (
              <p style={{ color: 'black' }}>{localStorage.getItem('email')}</p>
            )}
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Appbar;
