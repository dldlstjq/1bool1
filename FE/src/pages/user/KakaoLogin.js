import * as React from "react";
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
// import { useState, useEffect, useCallback } from 'react';
// import Button from '@mui/material/Button';
import Container from "@mui/material/Container";

import { BASE_URL } from "../../index";
import axios from "axios";
import styled from "styled-components";
import Appbar from "../../components/main/Appbar";

const { Kakao } = window;

export default function KakaoLogin() {
  const navigate = useNavigate();
  // const CLIENT_ID = '036e9cc127f3c0b11192c751fab0d62b';
  // const REDIRECT_URI = 'http://k6d207.p.ssafy.io/api/v1/users/kakao';
  // const REDIRECT_URI = 'http://localhost:3000/oauth/callback/kakao';
  // const REDIRECT_URI = 'http://localhost:3000/signin';
  //   https://kauth.kakao.com/oauth/authorize?client_id=036e9cc127f3c0b11192c751fab0d62b&redirect_uri=http://k6d207.p.ssafy.io/api/v1/users/kakao&response_type=code
  // const KAKAO_LOGIN_API_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  // const KAKAO_LOGIN_API_URL = `https://kauth.kakao.com/oauth/authorize?client_id=036e9cc127f3c0b11192c751fab0d62b&redirect_uri=http://k6d207.p.ssafy.io/api/v1/users/kakao&response_type=code`;

  function kakaoLoginClickHandler(e) {
    e.preventDefault();
    Kakao.Auth.login({
      success: function (authObj) {
        // 카카오 계정 이메일을 가져옴.
        // 카카오 이메일은 ok. but 좋아요 등록 시 user_id를 어떻게 가져오나?
        console.log(authObj);
        Kakao.API.request({
          url: "/v2/user/me",
          success: function (res) {
            localStorage.setItem("email", res.kakao_account.email);
            // console.log(res);
            // console.log(res.id);
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
          url: BASE_URL + "users/kakao",
          params: {
            token: authObj.access_token,
          },
        })
          .then((res) => {
            localStorage.setItem("user_id", res.data.object.id);
            if (res.data.statusCode === 200) {
              alert("1bool1에 오신걸 환영합니다!");
              navigate("/");
            }
            Promise.resolve(res.data.object.id);
          })
          .then((res) => {
            axios({
              method: "get",
              url: "board/like/userlist",
              params: { user_id: res },
            })
              .then((res) =>
                localStorage.setItem("board", JSON.stringify(res.data.object))
              )
              .catch((err) => console.log(err));
          });
      },
      fail: function (err) {
        alert(JSON.stringify(err));
      },
    });
  }

  return (
    <Section>
      <Appbar />
      <Container component="main" maxWidth="xs">
        <Box
          component={Paper}
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <a href={KAKAO_LOGIN_API_URL}>
            <img
              src={require('../../common/kakao_logo.png')}
              alt='카카오 로그인'
              width='225px'
              height='auto'
            ></img>
          </a> */}
          <img src={require("../../common/logo.png")} alt="1bool1"></img>
          <Box component="form" noValidate sx={{ mt: 1, marginTop: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={1}></Grid>
              <Grid item xs={10} md={10}>
                <img
                  src={require("../../common/kakao_logo.png")}
                  alt="카카오 로그인"
                  width="225px"
                  height="auto"
                  style={{ marginLeft: 40 }}
                  onClick={kakaoLoginClickHandler}
                ></img>
                {/* <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  type='email'
                  // value={email}
                  // onChange={onChangeEmail}
                /> */}
              </Grid>
              <Grid item xs={1}></Grid>

              <Grid item xs={1}></Grid>
              {/* <Grid item xs={10}>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  // onChange={(e) => {
                  //   setPassword(e.target.value);
                  // }}
                />
              </Grid> */}
              <Grid item xs={1}></Grid>

              <Grid item xs={2}></Grid>

              <Grid item xs={2}></Grid>

              {/* <Grid item md={10}>
                <img
                  src={require('../../common/kakao_logo.png')}
                  alt='카카오 로그인'
                  width='225px'
                  height='auto'
                  sx={{ mb: 3, mx: 4 }}
                  onClick={kakaoLoginClickHandler}
                ></img>
              </Grid> */}
            </Grid>
          </Box>
          {/* <div className='App'>
            <img
              src={require('../../common/kakao_logo.png')}
              alt='카카오 로그인'
              width='225px'
              height='auto'
              onClick={kakaoLoginClickHandler}
            ></img>
          </div> */}
        </Box>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  background-color: #ffe2e180;
  background-size: cover;
  min-height: 100vh;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
`;
