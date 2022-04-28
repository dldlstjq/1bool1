import React, { useState, useEffect } from 'react';
import Appbar from '../../components/main/Appbar';
import Footer from '../../components/main/Footer'
import { Button, Container, Grid, TextField, Typography, Box} from '@mui/material';
import logo from '../../common/logo.png'
import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore, { Pagination, Navigation } from "swiper";
import { Pagination, Navigation } from "swiper";
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import axios from 'axios';
// import 'swiper/scss'
// import 'swiper/scss/navigation'
// import 'swiper/scss/pagination'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Main.css";
// import "swiper/components/navigation/navigation.scss";
// SwiperCore.use([Navigation, A11y]);
import { Link } from 'react-router-dom';

function Main() {
  const [word, setWord] = useState("");
  const [menus, setMenus] = useState([]);
  // const prevRef = useRef(null);
	// const nextRef = useRef(null);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/v1/goods')
      // .get('https://k6d207.p.ssafy.io/api/api/v1/goods')
      .then(({data}) => {
        setMenus(data.object)
        console.log(data)

      })
  }, []);

  const onSubmit = async () => {
    window.location.href = "/store/" + word;
  };
  

  return (
    <div style={{display: 'flex', flexDirection:'column', minHeight:'100%'}}>
      <Appbar/>
      <div style={{flex:'1'}}>
        <Container maxWidth="lg" >
          <Grid container spacing={2} style={{margin: 0, height: 500}}>
            <Grid item xs={12} md={6} >
          <Box style={{margin:40}}>  
              <Typography variant="h4" style={{fontWeight:'bold',}} >
                오늘의 할인은?
              </Typography>
              <Typography variant="h6" style={{fontWeight:'bold', }}>
                편의점의 할인 상품들을 알려드려요!
              </Typography>
              <TextField label="상품을 검색하세요" variant="standard" >
              <input onChange={(e) => { setWord(e.target.value); console.log(word); }} ></input>

                <Button type="button" onClick={() => { onSubmit(); }}></Button>
              </TextField>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} style={{display: 'flex', justifyContent:'center'}}>
            <img src={logo} alt="logo" />
            </Grid>

          </Grid>
          <Typography variant="h4" style={{fontWeight:'bold', display: 'flex', justifyContent:'center', marginTop:'8rem'}}>
                새로운 상품
          </Typography>
          <Typography variant="h6" style={{color: 'grey', display: 'flex', justifyContent:'end'}}>
                상품 모두 보기 {'>'}
          </Typography>
          <Grid container spacing={3} style={{height: 370, margin: 0, padding:0}}>
            <Grid item xs={1} sx={{padding:0, display:{xs:'none', md:'flex'}}}>
              <Button className="swiper-button-prev" style={{color:'#F93D59', display:{xs:'none'}}}>  </Button>
            </Grid>
            <Grid item xs={10} style={{padding:0}}>
              <Swiper
                slidesPerView={2}
                spaceBetween={55}
                slidesPerGroup={2}
                loop={true}
                loopFillGroupWithBlank={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                // navigation={true}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev"
                }}
                // modules={[Pagination]}
                modules={[Pagination, Navigation]}
                breakpoints= {{
                  640: {
                    slidesPerView: 3,
                    spaceBetween: 25,
                    slidesPerGroup: 3,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 25,
                    slidesPerGroup: 4,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 25,
                    slidesPerGroup: 5,
                  },
                }}
                className="mySwiper"
              >

                {menus.map(menu => 
                  <SwiperSlide key={menu.id}>
                    <Link to={`/${menu.id}`} style={{textDecoration:'none'}}>
                      <Card sx={{ width: 170, height: 300, boxShadow:0, border: 1, borderColor: 'grey.300', borderRadius: '16px' }}>
                        <Box sx={{display: 'felx', flexDirection:'column', width:180, height:180}}>
                          <CardMedia
                            component="img"
                            alt="green iguana"
                            sx={{ width: 160, height:180 }}
                            image={`${menu.photoPath}`}
                            />

                        </Box>
                        <CardContent>
                          <Typography gutterBottom variant="h8" component="div">
                            {menu.name}
                          </Typography>
                          <Typography gutterBottom variant="h7" component="div" style={{fontWeight:'bold'}}>
                            {menu.price}원
                          </Typography>
                        </CardContent>
                      </Card>
                    </Link>
                  </SwiperSlide>)}
              </Swiper>
            </Grid>
            <Grid item xs={1} sx={{display:{xs:'none', md:'flex'}}}>
            <Button className="swiper-button-next" style={{color:'#F93D59'}}> </Button> 
            </Grid>
          </Grid>
          <Typography variant="h4" style={{fontWeight:'bold', display: 'flex', justifyContent:'center', marginTop:'8rem'}}>
                새로운 상품
          </Typography>
          <Typography variant="h6" style={{color: 'grey', display: 'flex', justifyContent:'end'}}>
                상품 모두 보기 {'>'}
          </Typography>
          <Grid container spacing={3} style={{height: 370, margin: 0, padding:0, marginBottom:'5rem'}}>
            <Grid item xs={1} sx={{padding:0, display:{xs:'none', md:'flex'}}}>
              <Button className="swiper-button-prev" style={{color:'#F93D59', display:{xs:'none'}}}>  </Button>
            </Grid>
            <Grid item xs={10} style={{padding:0}}>
              <Swiper
                slidesPerView={2}
                spaceBetween={55}
                slidesPerGroup={2}
                loop={true}
                loopFillGroupWithBlank={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                // navigation={true}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev"
                }}
                // modules={[Pagination]}
                modules={[Pagination, Navigation]}
                breakpoints= {{
                  640: {
                    slidesPerView: 3,
                    spaceBetween: 25,
                    slidesPerGroup: 3,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 25,
                    slidesPerGroup: 4,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 25,
                    slidesPerGroup: 5,
                  },
                }}
                className="mySwiper"
              >

                {menus.map(menu => 
                  <SwiperSlide key={menu.id}>
                    <Link to={`/${menu.id}`} style={{textDecoration:'none'}}>
                      <Card sx={{ width: 170, height: 300, boxShadow:0, border: 1, borderColor: 'grey.300', borderRadius: '16px' }}>
                        <Box sx={{display: 'felx', flexDirection:'column', width:180, height:180}}>
                          <CardMedia
                            component="img"
                            alt="green iguana"
                            sx={{ width: 160, height:180 }}
                            image={`${menu.photoPath}`}
                            />

                        </Box>
                        <CardContent>
                          <Typography gutterBottom variant="h8" component="div">
                            {menu.name}
                          </Typography>
                          <Typography gutterBottom variant="h7" component="div" style={{fontWeight:'bold'}}>
                            {menu.price}원
                          </Typography>
                        </CardContent>
                      </Card>
                    </Link>
                  </SwiperSlide>)}
              </Swiper>
            </Grid>
            <Grid item xs={1} sx={{display:{xs:'none', md:'flex'}}}>
            <Button className="swiper-button-next" style={{color:'#F93D59'}}> </Button> 
            </Grid>
          </Grid>

          
          </Container>
      </div>
      <Footer/>
    </div>
    );
}

export default Main;