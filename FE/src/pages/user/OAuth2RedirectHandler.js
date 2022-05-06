import React, { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import axios from 'axios';
// import { actionCreators as userActions } from "../redux/modules/user";
// import Spinner from "./Spinner";

const OAuth2RedirectHandler = (props) => {
  //   const dispatch = useDispatch();

  //   // 인가코드
  //   let code = new URL(window.location.href).searchParams.get("code");

  //   React.useEffect(async () => {
  //     await dispatch(userActions.kakaoLogin(code));
  //   }, []);

  //   return <Spinner />;

  useEffect(() => {
    let params = new URL(document.location.href).searchParams;
    let code = params.get('code'); // 인가코드 받는 부분
    // let grant_type = 'authorization_code';
    // let client_id = '036e9cc127f3c0b11192c751fab0d62b';
    axios({
      method: 'GET',
      url: `https://k6d207.p.ssafy.io/api/v1/user/kakao?code=${code}`,
    }).then((res) => {
      console.log(res); // 토큰이 넘어올 것임

      const ACCESS_TOKEN = res.data.accessToken;

      localStorage.setItem('token', ACCESS_TOKEN); //예시로 로컬에 저장함

      //   history.replace('/main'); // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
    });

    // axios
    //   .post(
    //     `https://kauth.kakao.com/oauth/token?
    //     grant_type=${grant_type}
    //     &client_id=${client_id}
    //     &redirect_uri=http://localhost:3000/oauth/callback/kakao
    //     &code=${code}`,
    //     {
    //       headers: {
    //         'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     // res에 포함된 토큰 받아서 원하는 로직을 하면된다.
    //   });
  }, []);

  return <div>사실 이페이지는 크게 의미 없다. 첫화면으로 로직이 끝나면 이동시켜주면 된다.</div>;
};

export default OAuth2RedirectHandler;
