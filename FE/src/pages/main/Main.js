/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Component } from 'react';
import Appbar from '../../components/main/Appbar';
import Footer from '../../components/main/Footer';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import convimg from '../../common/convinence4.png';
import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore, { Pagination, Navigation } from "swiper";
import { Pagination, Navigation } from 'swiper';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import axios from 'axios';
// import 'swiper/scss'
// import 'swiper/scss/navigation'
// import 'swiper/scss/pagination'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Main.css';
import { Link } from 'react-router-dom';
import Slide from '../../components/main/Slide';
import { Box } from '@mui/material';
import Slide2 from '../../components/main/Slide2';
import Store from '../store/Store';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import KakaoMap from '../kakaomap/KakaoMap';

const { kakao } = window;

function Main() {
  const [word, setWord] = useState('');
  const [likes, setLike] = useState([]);
  const [hits, setHit] = useState([]);
  var ps = new kakao.maps.services.Places();
  const navi = useNavigate();
  const searchWord = (event) => {
    setWord(event.target.value);
  };
  useEffect(() => {
    axios.get(`${axios.defaults.baseURL}recipe/like/week`).then(({ data }) => {
      setLike(data.object);
    });
  }, []);

  useEffect(() => {
    axios.get(`${axios.defaults.baseURL}goods/hit`).then(({ data }) => {
      setHit(data.object);
    });
  }, []);
  let state = word;

  function onSubmit() {
    navi('/store', { state });
  }

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Appbar />
      <div style={{ flex: '1' }}>
        <Container maxWidth='lg' style={{ display: 'flex', flexDirection: 'column' }}>
          <Box style={{ display: 'flex', justifyContent: 'center' }}>
            <Grid
              container
              spacing={2}
              style={{
                margin: 0,
                height: 500,
                display: 'flex',
                alignItems: 'center',
                justifyItems: 'center',
              }}
            >
              <Grid
                item
                xs={12}
                md={6}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  height: { xs: '200px', md: '350px' },
                  alignSelf: 'end',
                }}
              >
                <img src={convimg} alt='convimg' />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Box style={{ marginLeft: '2rem' }}>
                  <Typography variant='h4' style={{ fontWeight: 'bold' }}>
                    오늘의 할인은?
                  </Typography>
                  <Typography variant='h6' style={{ fontWeight: 'bold', wordBreak: 'keep-all' }}>
                    편의점의 할인 상품을 알려드려요!
                  </Typography>
                  <TextField
                    onChange={searchWord}
                    onKeyPress={onKeyPress}
                    id='standard-basic'
                    label='상품을 입력하세요'
                    variant='standard'
                  />
                  <Button
                    onClick={onSubmit}
                    style={{
                      backgroundColor: '#F93D59',
                      color: 'white',
                      fontWeight: 'bold',
                      borderRadius: 20,
                      height: '2rem',
                      marginTop: '1rem',
                    }}
                    name='adr'
                  >
                    검색
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Box>
              <Typography
                variant='h4'
                style={{
                  fontWeight: 'bold',
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '4rem',
                }}
              >
                상품 조회수 TOP 10
              </Typography>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'end' }}>
              <Link to='/store'>
                <Typography
                  variant='h6'
                  style={{ color: 'grey', display: 'flex', justifyContent: 'end' }}
                >
                  {' '}
                  상품 모두 보기 {'>'}{' '}
                </Typography>
              </Link>
            </Box>
            <Box style={{ marginTop: 20 }}>
              <Slide menus={hits} />
            </Box>
          </Box>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: '400px',
              marginBottom: '5rem',
              marginTop: '3rem',
            }}
          >
            <Grid
              container
              spacing={2}
              style={{
                margin: 0,
                height: 500,
                display: 'flex',
                alignItems: 'center',
                justifyItems: 'center',
              }}
            >
              <Grid item xs={12} md={12}>
                <Box style={{ display: 'felx', justifyContent: 'end' }}>
                  <Box
                    style={{
                      display: 'felx',
                      justifyItems: 'end',

                      marginLeft: 14,
                      wordBreak: 'keep-all',
                    }}
                  >
                    <Typography variant='h4' style={{ fontWeight: 'bold', textAlign: 'center' }}>
                      우리동네 편의점 어디있지?
                    </Typography>
                    <Typography
                      variant='h6'
                      style={{ fontWeight: 'bold', wordBreak: 'keep-all', textAlign: 'center' }}
                    >
                      근처에 있는 편의점 찾기!
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={12} style={{ height: '400px' }}>
                <KakaoMap />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Box>
              <Typography
                variant='h4'
                style={{
                  fontWeight: 'bold',
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '8rem',
                }}
              >
                레시피 TOP 10
              </Typography>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'end' }}>
              <Link to='/recipe'>
                <Typography
                  variant='h6'
                  style={{ color: 'grey', display: 'flex', justifyContent: 'end' }}
                >
                  {' '}
                  레시피 모두 보기 {'>'}{' '}
                </Typography>
              </Link>
            </Box>
            <Box style={{ marginTop: 20 }}>
              <Slide2 menus={likes} />
            </Box>
          </Box>
          
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Main;
