/* eslint-disable no-unused-vars */
import { Container, Grid, Typography, Box, Button, TextField} from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { FaWonSign, FaCoins } from "react-icons/fa";
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

function Recipe({ recipe }) {
  const { id, title, photo, nickname, minute, star, price, cnt } = recipe;

  const photos = photo?.split(",");
  console.log(recipe)
  return (
    <div className="pt-4" style={{height:'350px'}}>
      <div style={{height:'200px',display:'flex', justifyContent:'center'}}>
        <img
          src={photos && photos[0]}
          // src={photos[0]}
          alt="이미지가 없습니다"
          id={id}
          className="main-photo"
          // style={{height:'200px' }}
          style={{height:'100%' }}
        />

      </div>
      <h1 className="font-bold main-photo" id={id} style={{ wordBreak: "keep-all", paddingLeft:'1rem' }}>
        {title}
      </h1>
      <h2 className="font-bold main-photo" id={id} style={{ wordBreak: "keep-all", paddingLeft:'1rem', display:'flex', flexDirection:'row' }}>
      <FaCoins size='18' color='gold' style={{marginTop:2, marginRight:'5'}} />{price}1000원
      </h2>
      {/* <h2 className="font-bold main-photo" id={id} style={{ wordBreak: "keep-all", paddingLeft:'1rem', display:'flex', flexDirection:'row' }}>
      {price}1000원
      </h2> */}
      <h2 className="main-photo" id={id} style={{ wordBreak: "keep-all", paddingLeft:'1rem', display:'flex', flexDirection:'row', marginTop:'0.5rem' }}>
       <FavoriteIcon style={{color:'#F93D59', marginRight:3}}/> {cnt} &nbsp;<AccessAlarmIcon style={{marginRight:3}}/> {minute}분
      </h2>

    </div>
  );
}

export default Recipe;
