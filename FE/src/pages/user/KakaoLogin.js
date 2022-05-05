import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import { BASE_URL } from '../../index';
import axios from 'axios';

const { Kakao } = window;

export default function KakaoLogin() {
  const navigate = useNavigate();
  const CLIENT_ID = '036e9cc127f3c0b11192c751fab0d62b';
  const REDIRECT_URI = 'http://k6d207.p.ssafy.io/api/v1/users/kakao';
  // const REDIRECT_URI = 'http://localhost:3000/signin';
  //   https://kauth.kakao.com/oauth/authorize?client_id=036e9cc127f3c0b11192c751fab0d62b&redirect_uri=http://k6d207.p.ssafy.io/api/v1/users/kakao&response_type=code
  const KAKAO_LOGIN_API_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  //   const KAKAO_LOGIN_API_URL = `https://kauth.kakao.com/oauth/authorize?client_id=036e9cc127f3c0b11192c751fab0d62b&redirect_uri=http://k6d207.p.ssafy.io/api/v1/users/kakao&response_type=code`;

  const kakaoLoginClickHandler = () => {
    Kakao.Auth.login({
      success: function (authObj) {
        // fetch(`${KAKAO_LOGIN_API_URL}`, {
        //   method: 'POST',
        //   body: JSON.stringify({
        //     access_token: authObj.access_token,
        //   }),
        // })
        //   // .then((res) => res.json())
        //   .then((res) => {
        //     console.log(res);
        //     localStorage.setItem('Kakao_token', res.access_token);
        //     console.log('성공했나');
        //     if (res.access_token) {
        //       alert('1bool1에 오신걸 환영합니다!');
        //       navigate('/');
        //     }
        //   });

        // accessToken을 kakaoCallback에 날렸지만 로그인 불가능 답이 옴
        // 밑에 카카오 자체 api로 요청하면 이메일이 숫자로만 나옴.
        axios
          .get(BASE_URL + 'users/kakao', {
            params: {
              code: authObj.access_token,
            },
          })
          // .then((res) => res.json())
          .then((res) => {
            console.log(res);
            localStorage.setItem('Kakao_token', res.access_token);
            console.log('성공했나');
            if (res.access_token) {
              alert('1bool1에 오신걸 환영합니다!');
              navigate('/');
            }
          });

        // Kakao.API.request({
        //   url: '/v2/user/me',
        //   success: function (res) {
        //     console.log(res);
        //     // alert(JSON.stringify(res))
        //   },
        //   fail: function (error) {
        //     alert(
        //       'login success, but failed to request user information: ' + JSON.stringify(error)
        //     );
        //   },
        // });
        console.log(authObj);
      },
      fail: function (err) {
        alert(JSON.stringify(err));
      },
    });
  };

  return (
    <div className='App'>
      <Button className='btn kakao' onClick={kakaoLoginClickHandler}>
        hahaha
      </Button>
      {/* <a href={KAKAO_LOGIN_API_URL}>
        <img
          src={require('../../common/kakao_logo.png')}
          alt='카카오 로그인'
          width='225px'
          height='auto'
        ></img>
      </a> */}
      {/* <article className='socialLogin'>
        <Button className='btn kakao'></Button>
      </article> */}
    </div>
  );
}
