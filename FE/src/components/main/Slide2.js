import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button, Typography, Box } from '@mui/material';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function Slide2({menus}) {
  return (
    <Box style={{display:'flex', flexDirection:'row', height:'400px', marginTop:'-28px'}}>
      <Button className='swiper-button-prev' style={{ color: '#F93D59'  }} />
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        slidesPerGroup={1}
        loop={true}
        loopFillGroupWithBlank={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        observer={true}
        observeParents={true}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Pagination, Navigation]}
        breakpoints={{
          576: {
            slidesPerView: 3,
            spaceBetween: 20,
            slidesPerGroup: 3,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
            slidesPerGroup: 4,
          },
          992: {
            slidesPerView: 5,
            spaceBetween: 15,
            slidesPerGroup: 5,
          },
        }}
        className='mySwiper'
      >
        {menus.map((menu) => (
          <SwiperSlide key={menu.id}>
            <Link to={`/recipe/${menu.id}`} state={{ data: menu }} style={{ textDecoration: 'none', }}>
              <Card
                sx={{
                  width: 170,
                  height: 300,
                  boxShadow: 0,
                  border: 1,
                  borderColor: 'grey.300',
                  borderRadius: '16px',
                }}
              >
              <Box sx={{ display: 'felx', flexDirection: 'column', width: 180, height: 180 }} >
                <CardMedia
                  component='img'
                  alt='이미지 준비중'
                  sx={{ width: 160, height: 180 }}
                  image={`${menu.photo}`}
                />
              </Box>
              <CardContent>
                <Typography gutterBottom variant='h8' component='div'>
                  {menu.title}
                </Typography>
                <Typography
                  gutterBottom
                  variant='h7'
                  component='div'
                  style={{ fontWeight: 'bold' }}
                >
                  {menu.price}원
                </Typography>
              </CardContent>
              </Card>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
        <Button className='swiper-button-next' style={{ color: '#F93D59' }} />
    </Box>
  );
}

export default Slide2;