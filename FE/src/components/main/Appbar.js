import React from "react";
import { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/MenuItem";

import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

import logo from "../../common/logo.png";
import kakaoLogo from "../../common/kakaolink_btn.png";
import kakaoLogin from "../../common/kakao_login.png";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { BASE_URL } from "../../index";
import axios from "axios";

const settings = ["로그인"];
const { Kakao } = window;

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

function Appbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    if (localStorage.getItem("isAlarm") !== null) {
      setChecked(true);
    }
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    setChecked(event.target.checked);

    if (event.target.checked) {
      axios({
        method: "put",
        url: BASE_URL + "users",
        data: {
          id: localStorage.getItem("user_id"),
          isAlarm: 0,
          isWithdrawal: 0,
          nickname: "your_password",
          password: "your_password",
        },
      }).then((res) => {
        localStorage.setItem("isAlarm", true);
        alert("알람을 활성화했습니다.");
      });
      // .catch((err) => console.log(err));
    } else {
      axios({
        method: "put",
        url: BASE_URL + "users",
        data: {
          id: localStorage.getItem("user_id"),
          isAlarm: 0,
          isWithdrawal: 0,
          nickname: "your_password",
          password: "your_password",
        },
      })
        .then((res) => {
          localStorage.removeItem('isAlarm');
          alert('알람을 껐습니다.');
        })
    }
  };
  const navigate = useNavigate();
  const location = useLocation();

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

  async function kakaoLoginClickHandler(e) {
    e.preventDefault();
    Kakao.Auth.login({
      success: function (authObj) {
        Kakao.API.request({
          url: "/v2/user/me",
          success: function (res) {
            localStorage.setItem('email', res.kakao_account.email);

          },
          fail: function (error) {
            alert(
              "login success, but failed to request user information: " +
                JSON.stringify(error)
            );
          },
        });

        axios({
          method: "post",
          url: BASE_URL + "users/kakao",
          params: {
            token: authObj.access_token,
          },
        }).then((res) => {
          const user_id = res.data.object.id;
          const apps = ["board", "recipe", "goods"];
          apps.forEach((app) => {
            axios({
              method: "get",
              url: `${app}/like/userlist`,
              params: { user_id },
            }).then((res) => {
              const likeIdArray = res.data.object.map((el) => el.id);
              localStorage.setItem([app], JSON.stringify(likeIdArray));
            });
          });

          localStorage.setItem("user_id", res.data.object.id);
          if (res.data.statusCode === 200) {
            alert("1bool1에 오신걸 환영합니다!");
            navigate(location.pathname);
          }
        });
      },
      fail: function (err) {
        alert(JSON.stringify(err));
      },
    });
  }

  function logout(e) {
    e.preventDefault();
    localStorage.removeItem("email");
    localStorage.removeItem("user_id");
    window.location.replace(location.pathname);
  }
  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: "white",
        boxShadow: "rgb(249, 61, 89) 0px 2px",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ mr: 2, mt: 1, display: { xs: "none", md: "flex" } }}>
            <Link to="/">
              <img src={logo} alt="logo" style={{ height: "5rem" }} />
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/store" style={{ textDecoration: "none" }}>
                  <Button
                    style={{
                      color: "black",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    편의점
                  </Button>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/recipe" style={{ textDecoration: "none" }}>
                  <Button
                    style={{
                      color: "black",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    레시피
                  </Button>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/community" style={{ textDecoration: "none" }}>
                  <Button
                    style={{
                      color: "black",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    커뮤니티
                  </Button>
                </Link>
              </MenuItem>
              
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Link to="/">
              <img src={logo} alt="logo" style={{ height: "4rem" }} />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link
              to="/store"
              style={{
                textDecoration: "none",
                marginRight: "2rem",
                marginLeft: "6rem",
                hoverColor: "red",
              }}
            >
              <Button
                style={{
                  my: 2,
                  color: "black",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                편의점
              </Button>
            </Link>
            <Link
              to="/recipe"
              style={{
                textDecoration: "none",
                marginRight: "2rem",
                marginLeft: "2rem",
                hoverColor: "red",
              }}
            >
              <Button
                style={{
                  my: 2,
                  color: "black",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                레시피
              </Button>
            </Link>
            <Link
              to="/community"
              style={{
                textDecoration: "none",
                marginRight: "2rem",
                marginLeft: "2rem",
                hoverColor: "red",
              }}
            >
              <Button
                style={{
                  my: 2,
                  color: "black",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                커뮤니티
              </Button>
            </Link>
            
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <NotificationsActiveIcon
              color="error"
              style={{ marginRight: "5" }}
            />
            <Tooltip title="Open settings">
              <FormControlLabel
                control={<Android12Switch checked={checked} onChange={handleChange} />}

              />
            </Tooltip>

            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0, width: "50px", height: "50px" }}
              >
                {localStorage.getItem("email") ? (
                  <img src={kakaoLogo} alt="kakao" />
                ) : (
           
                  <img src={kakaoLogin} alt='kakao' />

                )}
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  {setting === "로그인" &&
                    localStorage.getItem("email") === null && (
                      <Link to="/signin" style={{ textDecoration: "none" }}>
                        <Typography
                          textAlign="center"
                          onClick={kakaoLoginClickHandler}
                        >
                          {setting}
                        </Typography>
                      </Link>
                    )}
                  {localStorage.getItem("email") && (
                    <Grid container spacing={2} colums={16}>
                      <Grid item xs={8}>
                        <p style={{ color: "black" }}>
                          {localStorage.getItem("email")}
                        </p>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography textAlign="center" onClick={logout}>
                          로그아웃
                        </Typography>
                      </Grid>
                    </Grid>
                  )}
               
                </MenuItem>
              ))}
            </Menu>
          </Box>
    
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Appbar;
