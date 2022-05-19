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
  console.log(like);
  const handleLike = async (e) => {
    // e.preventDefault();
    // if (localStorage.getItem('user_id') !== null) {
    //   try {
    //     await axios({
    //       method: 'get',
    //       url: BASE_URL + `recipe/like/${recipeId}`,
    //     }).then((res) => {
    //       if (res.data.statusCode === 200) {
    //         setLikeCnt(res.data.object);
    //       }
    //     });
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    setLike(like + 1);
  };

  return (
    <>
      <img src={photo} alt='' className='main-photo w-3/4 mx-auto' style={{ width: '500px' }} />
      {/* <div className='flex justify-between mb-3' style={{ marginTop: '10px' }}> */}
      {/* <div style={{ textAlign: 'center' }}> */}
      {/* <h1>
            <span className='text-lg font-bold text-purple-900'>{nickname} </span>
            님의
          </h1> */}
      <p id='recipeTitle'> {title}</p>
      {/* </div> */}
      {/* <div id='icons' className='flex justify-end items-center'>
          <img src='/images/bookmark.png' alt='' className='w-6' />
          <img src='/images/share.png' alt='' className='w-8' />
        </div> */}
      {/* </div> */}
      {/* <div className='inline-block w-1/2'>
        난이도
        {[...Array(star)].map((e, i) => (
          <img src='/images/star.png' alt='' key={i} className='w-5 inline-block' />
        ))}
      </div> */}
      {/* <h1 className='text-xl'> 이 요리는...</h1> */}
      <p id='recipeDescription'> {description}</p>
      <div /*class='place-content-center' style={{ display: 'flex' }}*/>
        {/* <div> */}
        <Grid
          container
          spacing={1}
          columns={{ xs: 4, sm: 8, md: 12 }}
          style={{ justifyContent: 'center' }}
        >
          <Grid /*xs={6} md={6}*/ xs={1} sm={2} md={4} lg={4}>
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
          <Grid /*xs={6} md={6}*/ xs={1} sm={2} md={4} lg={4}>
            <div class='place-content-center' style={{ display: 'flex' }}>
              <AccessAlarmIcon id='clock' />
            </div>
          </Grid>

          <Grid /*xs={6} md={6}*/ xs={1} sm={2} md={4} lg={4}>
            <div class='place-content-center' style={{ display: 'flex' }}>
              <FaCoins id='money' color='gold' />
            </div>
          </Grid>
        </Grid>
        {/* <AccessAlarmIcon id='clock' /> */}
        {/* </div> */}
      </div>

      <div /*class='place-content-center' style={{ display: 'flex' }}*/>
        {/* <div> */}
        <Grid
          container
          spacing={1}
          columns={{ xs: 4, sm: 8, md: 12 }}
          style={{ justifyContent: 'center' }}
        >
          <Grid /*xs={6} md={6}*/ xs={1} sm={2} md={4} lg={4}>
            <div class='place-content-center' style={{ display: 'flex', marginTop: 6 }}>
              <p id='like'>{likeCnt}</p>
            </div>
          </Grid>
          <Grid /*xs={6} md={6}*/ xs={1} sm={2} md={4} lg={4}>
            <div class='place-content-center' style={{ display: 'flex', marginTop: 6 }}>
              <p id='timeContent'>{minute}분</p>
            </div>
          </Grid>

          <Grid /*xs={6} md={6}*/ xs={1} sm={2} md={4} lg={4}>
            <div class='place-content-center' style={{ display: 'flex', marginTop: 6 }}>
              <p id='price'>{price}원</p>
            </div>
          </Grid>
        </Grid>
        {/* <AccessAlarmIcon id='clock' /> */}
        {/* </div> */}
      </div>

      {/* <Grid container spacing={1} sx={{ mx: '25' }} style={{ justifyContent: 'center' }}>
        <Grid xs={6} md={6}>
          <LikeButton
            url={'recipe/like/' + recipeId}
            user_id={localStorage.getItem('user_id')}
            recipe_id={recipeId}
          />
        </Grid>
        <Grid xs={6} md={6}>
          <p id='timeContent'>{minute}분 소요</p>
        </Grid>
      </Grid> */}

      {/* <p id='timeContent'>{minute}분 소요</p>
      <LikeButton
        url={'recipe/like/' + recipeId}
        user_id={localStorage.getItem('user_id')}
        recipe_id={recipeId}
      /> */}
      {/* 소요시간 : {minute}분<p> 수정일자 {modifiedDate?.split('.')[0]}</p> */}
    </>
  );
}

export default UpperInfo;
