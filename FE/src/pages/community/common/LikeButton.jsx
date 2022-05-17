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

function LikeButton({ url, user_id, recipe_id }) {
  const [foo, refresh] = useState(0);
  const [like, setLike] = useFetchItem(url, foo);
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
          console.log(res);
          if (res.data.object === 1) setIsLike(true);
        })
        .catch((err) => console.log(err));
    }
  }, [url, user_id]);
  // }, [recipe_id]);

  const postLike = async (e) => {
    if (localStorage.getItem('user_id') === null) {
      alert('로그인을 해야 좋아요가 가능합니다!');
      return;
    }

    const likeCurrent = e.target.checked;
    setIsLike(likeCurrent);
    // e.preventDefault();

    if (likeCurrent) {
      try {
        await axios({
          method: 'post',
          url: BASE_URL + `recipe/like/${recipe_id}`,
          params: {
            user_id: user_id,
          },
        }).then((res) => {
          if (res.data.statusCode === 200) {
            console.log('좋아요 등록');
          }
        });
      } catch (err) {
        console.log(err);
      }
    } else {
    }
  };

  // function postLike() {
  //   if (!user_id) {
  //     alert('로그인이 필요합니다');
  //     return;
  //   }
  //   axios({
  //     method: 'post',
  //     url,
  //     params: { user_id },
  //   })
  //     .then(() => refresh(foo + 1))
  //     .catch((err) => console.log(err));
  // }

  return (
    <div className='text-center my-7'>
      {/* <button className="btn" onClick={postLike}>
        <i className={classNames("icon-box icon-info w-5 h-5", "icon-up")}></i>
        {like}
      </button> */}
      <button className='btn'>
        <Checkbox
          {...label}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          checked={isLike}
          onChange={postLike}
          color='error'
        />
        {/* <i className='icon-box icon-info icon-up  w-5 h-5'></i> 0 */}
      </button>
    </div>
  );
}

export default LikeButton;
