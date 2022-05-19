/* eslint-disable no-unused-vars */
import { Container, Grid, Typography, Box, Button, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { FaWonSign, FaCoins } from 'react-icons/fa';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { Link } from 'react-router-dom';


function Recipe({ recipe }) {
  const { id, title, photo, nickname, minute, star, price, cnt } = recipe;
  const photos = photo?.split(',');
  return (
    <Grid item xs={12} sm={6} md={3} lg={3} key={id}>
    <Link to={`/recipe/${id}`}>
      <Card sx={{boxShadow:'none', display:'flex', flexDirection:'column', height:'350px' }}>
        <Box style={{ height: '200px',  display: 'flex', justifyContent: 'center',}}>
          {/* <CardMedia
          component="img"
          alt="이미지 준비중"
          sx={{ width :'50%' }}
          image={`${menu.photo}`}
          >
          </CardMedia> */}
          <img
            src={photos[0]}
            alt='이미지가 없습니다'
            style={{ width: {xs:'80', sm:'100%'}, padding:4 }}
            // style={{ height: '100%' }}
          />
        </Box>
        <Typography style={{ fontWeight:'bold' ,wordBreak: 'keep-all', paddingLeft: '1rem', fontSize: 15 }}>
         {title}
        </Typography>
        <Typography style={{ wordBreak: 'keep-all', paddingLeft: '1rem', display: 'flex', flexDirection: 'row',  fontSize: 15,}}>
          <FaCoins size='18' color='gold' style={{ marginTop: 2, marginRight: '5' }} />
          {price}원
        </Typography>
        <Typography style={{ wordBreak: 'keep-all', paddingLeft: '1rem', display: 'flex', flexDirection: 'row', marginTop: '0.5rem',fontSize: 14,}}>
            <FavoriteIcon style={{ color: '#F93D59', marginRight: 3 }} /> {cnt} &nbsp;
            <AccessAlarmIcon style={{ marginRight: 3 }} /> {minute}분
        </Typography>

      </Card>
    
    </Link>
    </Grid>

    // <div className='p-4' style={{ height: '350px' }}>
    //   <div style={{ height: '200px', display: 'flex', justifyContent: 'center' }}>
    //     <img
    //       // src={photos && photos[0]}
    //       src={photos[0]}
    //       alt='이미지가 없습니다'
    //       id={id}
    //       className='main-photo'
    //       style={{width:'100%' }}
    //       // style={{ height: '100%' }}
    //     />
    //   </div>
    //   <h1
    //     className='font-bold main-photo'
    //     id={id}
    //     style={{ wordBreak: 'keep-all', paddingLeft: '1rem', fontSize: 15 }}
    //   >
    //     {title}
    //   </h1>
    //   <h2
    //     className='font-bold main-photo'
    //     id={id}
    //     style={{
    //       wordBreak: 'keep-all',
    //       paddingLeft: '1rem',
    //       display: 'flex',
    //       flexDirection: 'row',
    //       fontSize: 15,
    //     }}
    //   >
    //     <FaCoins size='18' color='gold' style={{ marginTop: 2, marginRight: '5' }} />
    //     {price}원
    //   </h2>
    //   {/* <h2 className="font-bold main-photo" id={id} style={{ wordBreak: "keep-all", paddingLeft:'1rem', display:'flex', flexDirection:'row' }}>
    //   {price}1000원
    //   </h2> */}
    //   <h4
    //     className='main-photo'
    //     id={id}
    //     style={{
    //       wordBreak: 'keep-all',
    //       paddingLeft: '1rem',
    //       display: 'flex',
    //       flexDirection: 'row',
    //       marginTop: '0.5rem',
    //       fontSize: 14,
    //     }}
    //   >
    //     <FavoriteIcon style={{ color: '#F93D59', marginRight: 3 }} /> {cnt} &nbsp;
    //     <AccessAlarmIcon style={{ marginRight: 3 }} /> {minute}분
    //   </h4>
    // </div>
  );
}

export default Recipe;
