import React, { useState, useEffect } from 'react';
import Appbar from '../../components/main/Appbar';
import Footer from '../../components/main/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import { Button, Container, Grid, TextField, Typography, Box} from '@mui/material';
import { Container, Grid, Typography, Box} from '@mui/material';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';

function Store() {
  const [menus, setMenus] = useState([]);
  // const prevRef = useRef(null);
	// const nextRef = useRef(null);
  const eventGoods = {'1':'행사안함', '2':'1+1', '3': '2+1', '4': '3+1', '5': 'SALE', '6': '덤증정', '7': '균일가' }

  useEffect(() => {
    axios
      // .get('http://localhost:8080/api/v1/goods/cu/1')
      .get('https://k6d207.p.ssafy.io/api/v1/goods/cu/2')
      .then(({data}) => {
        setMenus(data.object)
        console.log(data)

      })
  }, []);
  return (
    <div style={{display: 'flex', flexDirection:'column', minHeight:'100%'}}>
    <Appbar/>
      <div style={{flex:'1'}}>
        <Container>
          <div>
            <form>
              <input type="text" placeholder="상품을 입력하세요" autoFocus />
              <button type="reset" className="btn-reset"></button>
            </form>

          </div>
          <Grid container spacing={2} >
            {menus.map(menu => 
            <Grid item xs={12} md={6} lg={4} style={{padding:0, justifyContent:'center', paddingLeft:'2.3rem', paddingTop:'1rem'}}>
                <Card sx={{justifyContent:'center', width: 300, height: 130, boxShadow:0, border: 1, borderColor: 'grey.300', borderRadius: '16px', display:'flex' }} center>
              <Link to={`/${menu.id}`} style={{textDecoration:'none',}}>
                  {/* <Box sx={{display: 'felx', flexDirection:'column', width:180, height:180}}> */}
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      sx={{ width: 100, height:120 }}
                      image={`${menu.photoPath}`}
                      />
                    {/* </Box> */}
                    </Link>
                    <Link to={`/${menu.id}`} style={{textDecoration:'none',}}>
                    <Box sx={{display:'flex', flexDirection:'column'}}>
                  {/* <CardContent> */}
                    <Typography gutterBottom variant="h8" component="div">
                      {menu.name}
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div" style={{fontWeight:'bold'}}>
                      {menu.price}원
                      {menu.convinence}
                      {eventGoods[menu.event]}
                    </Typography>
                  {/* </CardContent> */}
                  </Box>
              </Link>
                </Card>
            </Grid>
            )}
          </Grid>
        </Container>
      </div>
      <Footer/>
    </div>
  );
}

export default Store;