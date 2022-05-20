/* eslint-disable no-unused-vars */
import { useState } from 'react';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { Grid } from '@mui/material';
import axios from 'axios';
import { FaCoins } from 'react-icons/fa';

import { BASE_URL } from '../../../../../index';
import '../RecipeDetail.css';
import LikeButton from '../../../common/LikeButton';

function UpperInfo({
  photo,
  star,
  title,
  minute,
  modifiedDate,
  nickname,
  description,
  recipeId,
  price,
  likeCnt,
}) {
  const [like, setLike] = useState(likeCnt);
  const handleLike = async (e) => {

    setLike(like + 1);
  };

  return (
    <>
      <img src={photo} alt='' className='main-photo w-3/4 mx-auto' style={{ width: '500px' }} />

      <p id='recipeTitle'> {title}</p>
 


      <p id='recipeDescription'> {description}</p>
      <div >

        <Grid
          container
          spacing={1}
          columns={{ xs: 4, sm: 8, md: 12 }}
          style={{ justifyContent: 'center' }}
        >
          <Grid xs={1} sm={2} md={4} lg={4}>
            <div class='place-content-center' style={{ display: 'flex' }} onClick={handleLike}>
              <LikeButton
                url={'recipe/like/user/' + recipeId}
                user_id={localStorage.getItem('user_id')}
                recipe_id={recipeId}
                setLike={setLike}
                likeCnt={likeCnt}
              />
            </div>
          </Grid>
          <Grid  xs={1} sm={2} md={4} lg={4}>
            <div class='place-content-center' style={{ display: 'flex' }}>
              <AccessAlarmIcon id='clock' />
            </div>
          </Grid>

          <Grid  xs={1} sm={2} md={4} lg={4}>
            <div class='place-content-center' style={{ display: 'flex' }}>
              <FaCoins id='money' color='gold' />
            </div>
          </Grid>
        </Grid>
  
      </div>

      <div >
    
        <Grid
          container
          spacing={1}
          columns={{ xs: 4, sm: 8, md: 12 }}
          style={{ justifyContent: 'center' }}
        >
          <Grid  xs={1} sm={2} md={4} lg={4}>
            <div class='place-content-center' style={{ display: 'flex', marginTop: 6 }}>
              <p id='like'>{likeCnt}</p>
            </div>
          </Grid>
          <Grid  xs={1} sm={2} md={4} lg={4}>
            <div class='place-content-center' style={{ display: 'flex', marginTop: 6 }}>
              <p id='timeContent'>{minute}분</p>
            </div>
          </Grid>

          <Grid  xs={1} sm={2} md={4} lg={4}>
            <div class='place-content-center' style={{ display: 'flex', marginTop: 6 }}>
              <p id='price'>{price}원</p>
            </div>
          </Grid>
        </Grid>
        
      </div>



    </>
  );
}

export default UpperInfo;
