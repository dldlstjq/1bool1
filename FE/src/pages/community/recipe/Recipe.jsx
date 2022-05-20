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

          <img
            src={photos[0]}
            alt='이미지가 없습니다'
            style={{ width: {xs:'80', sm:'100%'}, padding:4 }}

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

  );
}

export default Recipe;
