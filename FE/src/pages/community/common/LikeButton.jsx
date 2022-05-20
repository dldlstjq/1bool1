/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

import { useFetchItem } from './hooks';
import classNames from 'classnames';
import axios from 'axios';
import { BASE_URL } from '../../../index';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function LikeButton({ url, user_id, recipe_id, setLike, likeCnt }) {
  const [foo, refresh] = useState(0);
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('user_id') !== null) {
      axios({
        method: 'get',
        url,
        params: {
          userId: user_id,
        },
      })
        .then((res) => {
          if (res.data.object === true) setIsLike(true);
        })
    }
  }, [url, user_id]);

  const postLike = async (e) => {
    if (localStorage.getItem('user_id') === null) {
      alert('로그인을 해야 좋아요가 가능합니다!');
      return;
    }

    const likeCurrent = e.target.checked;
    setIsLike(likeCurrent);

    if (likeCurrent) {
      setLike(likeCnt + 1);
    } else {
      setLike(likeCnt - 1);
    }

    try {
      await axios({
        method: 'post',
        url: BASE_URL + `recipe/like/${recipe_id}`,
        params: {
          user_id: user_id,
        },
      }).then((res) => {
        if (res.data.statusCode === 200) {
        }
      });
    } catch (err) {
    }
  };


  return (
    <div>

      <button className='btn'>
        <Checkbox
          {...label}
          icon={<FavoriteBorder sx={{ fontSize: '3rem' }} />}
          checkedIcon={<Favorite sx={{ fontSize: '3rem' }} />}
          checked={isLike}
          onChange={postLike}
          color='error'
        />
      </button>
    </div>
  );
}

export default LikeButton;
