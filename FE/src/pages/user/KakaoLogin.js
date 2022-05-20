import * as React from "react";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";

import { BASE_URL } from "../../index";
import axios from "axios";
import styled from "styled-components";
import Appbar from "../../components/main/Appbar";

const { Kakao } = window;

export default function KakaoLogin() {
  const navigate = useNavigate();

  function kakaoLoginClickHandler(e) {
    e.preventDefault();
    Kakao.Auth.login({
      success: function (authObj) {

        Kakao.API.request({
          url: "/v2/user/me",
          success: function (res) {
            localStorage.setItem("email", res.kakao_account.email);

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
          localStorage.setItem("user_id", res.data.object.id);

          if (res.data.statusCode === 200) {
            alert("1bool1에 오신걸 환영합니다!");
            navigate("/");
          }
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
     
              </Grid>
              <Grid item xs={1}></Grid>

              <Grid item xs={1}></Grid>
          
              <Grid item xs={1}></Grid>

              <Grid item xs={2}></Grid>

              <Grid item xs={2}></Grid>

      
            </Grid>
          </Box>
     
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
