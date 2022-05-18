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
// import "swiper/components/navigation/navigation.scss";
// SwiperCore.use([Navigation, A11y]);
import { Link } from 'react-router-dom';
import Slide from '../../components/main/Slide';
import { Box } from '@mui/material';
import Slide2 from '../../components/main/Slide2';
import Store from '../store/Store';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import KakaoMap from '../kakaomap/KakaoMap';

const { kakao } = window;

function Main() {
  const [word, setWord] = useState('');
  const [likes, setLike] = useState([]);
  const [hits, setHit] = useState([]);
  var ps = new kakao.maps.services.Places();
  // const prevRef = useRef(null);
  // const nextRef = useRef(null);
  const navi = useNavigate();
  const searchWord = (event) => {
    // console.log('이벤트', event)
    setWord(event.target.value);
    console.log(word)
  }
  useEffect(() => {
    axios
      // .get('http://localhost:8080/api/v1/goods')
      .get(`https://k6d207.p.ssafy.io/api/v1/recipe/like/week`)
      // .get(`https://k6d207.p.ssafy.io/api/v1/goods/like`)
      .then(({ data }) => {
        setLike(data.object);
        console.log('좋아요',data.object);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://k6d207.p.ssafy.io/api/v1/goods/hit`)
      .then(({ data }) => {
        setHit(data.object);
        // console.log('조회수', data.object, hits);
      });
  }, []);
  let state = word

  function onSubmit() {
    navi('/store', { state })
  };

  const onKeyPress= (e) => {
    if (e.key === 'Enter'){
      onSubmit();
    }
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Appbar />
      <div style={{ flex: '1' }}>
        <Container maxWidth='lg' style={{display:'flex', flexDirection:'column'}}>
          <Box style={{display:'flex', justifyContent:'center'}}>
            <Grid container spacing={2} style={{ margin: 0, height: 500, display:'flex', alignItems:'center', justifyItems:'center' }}>
            <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'center' , height:{xs:'200px',md:'350px'}, alignSelf:'end',  }}>
                <img src={convimg} alt='convimg' />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box style={{ marginLeft: '2rem'}}>
                  <Typography variant='h4' style={{ fontWeight: 'bold' }}>
                    오늘의 할인은?
                  </Typography>
                  <Typography variant='h6' style={{ fontWeight: 'bold', wordBreak: "keep-all", }}>
                    편의점의 할인 상품을 알려드려요!
                  </Typography>
                  <TextField onChange={searchWord} onKeyPress={onKeyPress} id="standard-basic" label="상품을 입력하세요" variant="standard" />
                  <Button  onClick={onSubmit} style={{backgroundColor:'#F93D59', color:'white', fontWeight:'bold', borderRadius:20, height:'2rem', marginTop:'1rem'}} name="adr">검색</Button>
                </Box>
              </Grid>
              
            </Grid>
          </Box>
          <Box>
            <Box>
              <Typography variant='h4' style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'center', marginTop: '4rem', }} >
                상품 조회수 TOP 10
              </Typography>
            </Box>
            <Box style={{display:'flex', justifyContent:'end'}}>
              <Link to='/recipe'>
                <Typography variant='h6' style={{ color: 'grey', display:'flex', justifyContent:'end'}} > 상품 모두 보기 {'>'} </Typography>
              </Link>
            </Box>
            <Box style={{marginTop:20}}>
              <Slide menus={hits}/>
            </Box>
          </Box>
          <Box style={{display:'flex', justifyContent:'center', height:'400px', marginBottom:'5rem', marginTop:'3rem'}} >
            <Grid container spacing={2} style={{ margin: 0, height: 500, display:'flex', alignItems:'center', justifyItems:'center' }}>
              <Grid item xs={12} md={5}>
                <Box style={{ display:'felx', justifyContent:'end'}}>
                  <Box style={{ display:'felx', justifyItems:'end', marginLeft:14,  wordBreak: "keep-all", }}>
                    <Typography variant='h4' style={{ fontWeight: 'bold', }}>
                      우리동네 편의점 어디있지?
                    </Typography>
                    <Typography variant='h6' style={{ fontWeight: 'bold', wordBreak: "keep-all", }}>
                      근처에 있는 편의점 찾기!
                    </Typography>
                    <TextField onChange={searchWord} onKeyPress={onKeyPress} id="standard-basic" label="OO동을 입력해보세요." variant="standard" />
                    <Button  onClick={onSubmit} style={{backgroundColor:'#F93D59', color:'white', fontWeight:'bold', borderRadius:20, height:'2rem', marginTop:'1rem'}} name="adr">검색</Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={7} style={{height:'400px'}}>
                <KakaoMap/>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Box>
              <Typography variant='h4' style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'center', marginTop: '5rem', }} >
                레시피 TOP 10
              </Typography>
            </Box>
            <Box style={{display:'flex', justifyContent:'end'}}>
              <Link to='/store'>
                <Typography variant='h6' style={{ color: 'grey', display:'flex', justifyContent:'end' }} > 상품 모두 보기 {'>'} </Typography>
              </Link>
            </Box>
            <Box style={{marginTop:20}}>
              <Slide2 menus={likes}/>
            </Box>
          </Box>
          {/* <Box style={{display:'flex', justifyContent:'center', height:'400px', marginBottom:'5rem'}} >
            <Grid container spacing={2} style={{ margin: 0, height: 500, display:'flex', alignItems:'center', justifyItems:'center' }}>
              <Grid item xs={12} md={6}>
                <Box style={{ marginLeft: '2rem'}}>
                  <Typography variant='h4' style={{ fontWeight: 'bold' }}>
                    우리동네 편의점 어디있지?
                  </Typography>
                  <Typography variant='h6' style={{ fontWeight: 'bold', wordBreak: "keep-all", }}>
                    근처에 있는 편의점 찾기!
                  </Typography>
                  <TextField onChange={searchWord} onKeyPress={onKeyPress} id="standard-basic" label="OO동" variant="standard" />
                  <Button  onClick={onSubmit} style={{backgroundColor:'#F93D59', color:'white', fontWeight:'bold', borderRadius:20, height:'2rem', marginTop:'1rem'}} name="adr">검색</Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} style={{height:'400px'}}>
                <KakaoMap/>
              </Grid>
            </Grid>
          </Box> */}
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Main;
