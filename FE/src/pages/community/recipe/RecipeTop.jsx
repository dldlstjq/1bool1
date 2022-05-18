/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Button,
  Box,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Card from '@mui/material/Card';
import axios from "axios";
import { Link } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { FaWonSign, FaCoins, FaCrown } from 'react-icons/fa';
import { AiOutlineCrown } from 'react-icons/ai';
// import { textAlign } from '@mui/system';

function RecipeTop(props) {
  const [menus, setMenu] = useState([]);

  useEffect(()=> {
    axios
    // .get(`https://1bool1.com/api/v1/recipe/like/top`)
    .get(`https://1bool1.com/api/v1/recipe/like/top`)
    .then(({data})=>{
      setMenu(data.object)
      console.log('홍', data.object)
    })
  },[]);

  return (
    <div>
      <Box style={{display:'flex', flexDirection:'row' ,marginTop: "4rem", marginBottom:'2rem',}}>
      {/* <AiOutlineCrown style={{ fontSize:50, color:'gold'  }}/> */}
      <FaCrown style={{ fontSize:50, color:'gold' }}/>
        <Typography
          variant="h4"
          style={{
            fontWeight: "bold",
            display: "flex",
            justifyContent: "start",
            paddingTop:10,
            marginLeft:10
          }}
        >
           레시피 TOP 4
        </Typography>
        {/* <FaCrown style={{ fontSize:50, color:'gold' }}/> */}

      </Box>
      <Box>
        <Grid container spacing={5}>
          {menus.map((menu, index) => 
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Link to={`/recipe/${menu.id}`}>
              <Card sx={{boxShadow:'none', display:'flex', flexDirection:'column', height:'350px' }}>
                <Box style={{ height: '200px',  display: 'flex', justifyContent: 'center', position:'relative'}}>
                  <Typography style={{position:'absolute', left:'0%' , backgroundColor:'#F93D59', color:'white', fontSize:20, width:'40px', height:'40px', textAlign:'center', borderRadius:10, fontWeight:'bold', paddingTop:5}}>
                    {index+1}
                  </Typography>
                  {/* <CardMedia
                  component="img"
                  alt="이미지 준비중"
                  sx={{ width :'50%' }}
                  image={`${menu.photo}`}
                  >
                  </CardMedia> */}
                  <img
                    src={menu.photo}
                    alt='이미지가 없습니다'
                    style={{ width: {xs:'80', sm:'100%'}, padding:4 }}
                    // style={{ height: '100%' }}
                  />
                </Box>
                <Typography style={{ fontWeight:'bold' ,wordBreak: 'keep-all', paddingLeft: '1rem', fontSize: 15 }}>
                 {menu.title}
                </Typography>
                <Typography style={{ wordBreak: 'keep-all', paddingLeft: '1rem', display: 'flex', flexDirection: 'row',  fontSize: 15,}}>
                  <FaCoins size='18' color='gold' style={{ marginTop: 2, marginRight: '5' }} />
                  {menu.price}원
                </Typography>
                <Typography style={{ wordBreak: 'keep-all', paddingLeft: '1rem', display: 'flex', flexDirection: 'row', marginTop: '0.5rem',fontSize: 14,}}>
                    <FavoriteIcon style={{ color: '#F93D59', marginRight: 3 }} /> {menu.cnt} &nbsp;
                    <AccessAlarmIcon style={{ marginRight: 3 }} /> {menu.minute}분
                </Typography>

              </Card>
            
            </Link>
            </Grid>
          )}

        </Grid>
      </Box>
    </div>
  );
}

export default RecipeTop;
