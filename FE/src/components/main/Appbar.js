import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/MenuItem";
import logo from "../../common/logo.png";
// import kakaoLogo from "../../common/kakao_k.png";
// import kakaoLogo from "../../common/kakao_round.png";
import kakaoLogo from "../../common/kakaolink_btn.png";
import kakaoLogin from "../../common/kakao_login.png";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { BASE_URL } from "../../index";
import axios from "axios";

// const pages = ['편의점', '레시피', '커뮤니티', '이벤트'];
const settings = ["로그인"];
const { Kakao } = window;

function Appbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

  function kakaoLoginClickHandler(e) {
    e.preventDefault();
    Kakao.Auth.login({
      success: function (authObj) {
        // 카카오 계정 이메일을 가져옴.
        // 카카오 이메일은 ok. but 좋아요 등록 시 user_id를 어떻게 가져오나?
        // console.log(authObj);
        // console.log(authObj.access_token);
        Kakao.API.request({
          url: "/v2/user/me",
          success: function (res) {
            localStorage.setItem("email", res.kakao_account.email);
            // console.log(res);
          },
          fail: function (error) {
            alert(
              "login success, but failed to request user information: " +
                JSON.stringify(error)
            );
          },
        });

        // accessToken을 kakaoCallback에 날렸지만 로그인 불가능 답이 옴
        axios({
          method: "post",
          url: BASE_URL + "users/kakaoAlarm",
          params: {
            token: authObj.access_token,
          },
        }).then((res) => {
          // console.log(res);
          // localStorage.setItem('user_id', res.data.object.id);
          if (res.data.statusCode === 200) {
            console.log("알림 보내기 성공!!");
          }
        });

        // accessToken을 kakaoCallback에 날렸지만 로그인 불가능 답이 옴
        axios({
          method: "post",
          url: BASE_URL + "users/kakao",
          params: {
            token: authObj.access_token,
          },
        }).then((res) => {
          // console.log(res);
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
              // color="inherit"
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
              {/* <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/map" style={{ textDecoration: "none" }}>
                  <Button
                    style={{
                      color: "black",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    근처 편의점
                  </Button>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Button
                    style={{
                      color: "black",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    공지사항
                  </Button>
                </Link>
              </MenuItem> */}
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
            {/* <Link
              to="/map"
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
                근처 편의점
              </Button>
            </Link>
            <Link
              to="/map"
              style={{
                textDecoration: "none",
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
                공지사항
              </Button>
            </Link> */}
          </Box>

          <Box sx={{ flexGrow: 0, }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, width:'80px' }}>
                {localStorage.getItem("email") ? (
                  <img src={kakaoLogo} alt='kakao'/>
                  // <Avatar alt="Remy Sharp" src={kakaoLogo} />
                ) : (
                  // <Avatar src={kakaoLogin} />
                  <img src={kakaoLogin} alt='kakao'/>
                  // <img src={kakaoLogo} alt='kakao'/>
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
