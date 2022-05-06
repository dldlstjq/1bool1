import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import { BASE_URL } from '../../index';
import axios from 'axios';
import styled from 'styled-components';
import Appbar from '../../components/main/Appbar';

const { Kakao } = window;

export default function KakaoLogin() {
  const navigate = useNavigate();
  const CLIENT_ID = '036e9cc127f3c0b11192c751fab0d62b';
  const REDIRECT_URI = 'http://k6d207.p.ssafy.io/api/v1/users/kakao';
  // const REDIRECT_URI = 'http://localhost:3000/oauth/callback/kakao';
  // const REDIRECT_URI = 'http://localhost:3000/signin';
  //   https://kauth.kakao.com/oauth/authorize?client_id=036e9cc127f3c0b11192c751fab0d62b&redirect_uri=http://k6d207.p.ssafy.io/api/v1/users/kakao&response_type=code
  const KAKAO_LOGIN_API_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  // const KAKAO_LOGIN_API_URL = `https://kauth.kakao.com/oauth/authorize?client_id=036e9cc127f3c0b11192c751fab0d62b&redirect_uri=http://k6d207.p.ssafy.io/api/v1/users/kakao&response_type=code`;

  const [user_id, setUserId] = useState();
  const [email, setEmail] = useState();

  const kakaoLoginClickHandler = () => {
    Kakao.Auth.login({
      success: function (authObj) {
        fetch(BASE_URL + 'users/kakao?token=' + authObj.access_token, {
          method: 'POST',
          // body: JSON.stringify({
          //   access_token: authObj.access_token,
          // }),
        })
          // .then((res) => res.json())
          .then((res) => {
            console.log(res);
            // localStorage.setItem('Kakao_token', res.access_token);
            console.log('성공했나');
            if (res.access_token) {
              alert('1bool1에 오신걸 환영합니다!');
              navigate('/');
            }
          });

        console.log(authObj);
        console.log(authObj.access_token);
        // accessToken을 kakaoCallback에 날렸지만 로그인 불가능 답이 옴
        // axios
        //   .post('https://k6d207.p.ssafy.io/api/v1/users/kakao', {
        //     params: {
        //       token: authObj.access_token,
        //     },
        //   })
        //   // .then((res) => res.json())
        //   .then((res) => {
        //     console.log(res);
        //     // localStorage.setItem('Kakao_token', res.access_token);
        //     console.log('성공했나');
        //     if (res.statusCode === 200) {
        //       alert('1bool1에 오신걸 환영합니다!');
        //       navigate('/');
        //     }
        //   });
        // axios
        //   .post(
        //     `https://kauth.kakao.com/oauth/token
        // grant_type=authorization_code
        // &client_id=036e9cc127f3c0b11192c751fab0d62b
        // &redirect_uri=http://k6d207.p.ssafy.io/api/v1/users/kakao
        // &code=${authObj.access_token}`,
        //     {
        //       headers: {
        //         'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        //       },
        //     }
        //   )
        //   .then((res) => {
        //     console.log(res);
        //   });
        // 카카오 계정 이메일을 가져옴.
        // 카카오 이메일은 ok. but 좋아요 등록 시 user_id를 어떻게 가져오나?
        Kakao.API.request({
          url: '/v2/user/me',
          success: function (res) {
            console.log(res);
            localStorage.setItem('email', res.kakao_account.email);
            // alert('1bool1에 오신걸 환영합니다!');
            // navigate('/');
          },
          fail: function (error) {
            alert(
              'login success, but failed to request user information: ' + JSON.stringify(error)
            );
          },
        });
      },
      fail: function (err) {
        alert(JSON.stringify(err));
      },
    });
  };

  return (
    <Section>
      <Appbar />
      <Container component='main' maxWidth='xs'>
        <Box
          component={Paper}
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
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
          <div className='App'>
            <img
              src={require('../../common/kakao_logo.png')}
              alt='카카오 로그인'
              width='225px'
              height='auto'
              onClick={kakaoLoginClickHandler}
            ></img>
          </div>
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

{
  /* <Button className='btn kakao' onClick={kakaoLoginClickHandler}>
              hahaha
            </Button> */
}

{
  /* <article className='socialLogin'>
        <Button className='btn kakao'></Button>
      </article> */
}
