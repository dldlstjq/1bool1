/* eslint-disable no-unused-vars */

import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';

import { BASE_URL } from '../../../index';
import Comments from '../common/comment/Comments';
import { DeleteOrUpdate } from './DeleteOrUpdate';
import Appbar from '../../../components/main/Appbar';
import Footer from '../../../components/main/Footer';
import { Container, Grid, Typography, Box, Button, TextField } from '@mui/material';
import moment from 'moment';

import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteIcon from '@mui/icons-material/Favorite';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Detail() {
  const navi = useNavigate();
  const state = useLocation().state;
  let userLike = null,
    userId = null;
  userId = localStorage.getItem('user_id');
  userLike = userId && JSON.parse(localStorage.getItem('board'));

  let title = '',
    content = '',
    modifiedDate = '',
    id = '',
    nickname = '',
    password = '',
    photo = '',
    cnt = '';

  useEffect(() => {
    if (!state) navi('/community');
    userLike?.forEach((article) => {
      if (article.id === id) setIsLike(true);
    });
  }, [state, userLike, id, navi]);

  const [articlePw, setarticlePw] = useState('');
  const [isLike, setIsLike] = useState(false);

  if (state) ({ title, content, modifiedDate, id, nickname, password, photo, cnt } = state);
  let time = moment({ modifiedDate }).format('YYYY.MM.DD HH:mm');

  const handleChange = async (e) => {
    if (localStorage.getItem('user_id') === null) {
      alert('로그인을 해야 좋아요가 가능합니다!');
      return;
    }

    try {
      await axios({
        method: 'post',
        url: BASE_URL + `board/like/${id}`,
        params: {
          user_id: localStorage.getItem('user_id'),
        },
      }).then((res) => {
        if (res.data.statusCode === 200) {
          userLike = isLike
            ? userLike.filter((article) => article.id !== id)
            : [...userLike, { ...state, cnt: state.cnt + 1 }];
          localStorage.setItem('board', JSON.stringify(userLike));
          setIsLike((prev) => !prev);
        }
      });
    } catch (err) {
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <Appbar />
      <div style={{ flex: '1' }} className='lg:w-3/4 sm:w-11/12 mx-auto'>
        <Container>
          <Box
            sx={{
              borderBottom: 2,
              borderColor: 'grey.500',
              marginTop: '3rem',
            }}
          >
            <Box
              sx={{
                borderBottom: 1,
                borderColor: 'grey.500',
                paddingLeft: '1rem',
              }}
            >
              <Typography variant='h4' style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                {title}
              </Typography>
              <Grid container>
                <Grid item xs={6} md={6}>
                  <Typography style={{ marginBottom: 10 }}>
                    {' '}
                    <AccountCircleIcon style={{ marginRight: 3, color: '#F93D59' }} />
                    {nickname} | {time}{' '}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  md={6}
                  style={{
                    display: 'flex',
                    justifyContent: 'end',
                    paddingRight: 10,
                    alignItems: 'center',
                  }}
                >
                  <FavoriteIcon style={{ color: '#F93D59', marginRight: 3 }}> &nbsp;</FavoriteIcon>
                  {cnt}
                </Grid>
              </Grid>

            </Box>
            <Box style={{ margin: '1rem' }}>
              <Typography style={{ padding: '1rem' }}>{content}</Typography>
              <Box>
                {photo !== 'error' &&
                  photo?.split(',').map((url, idx) => (
                    <Box style={{ width: '150px', height: '150px' }}>
                      <img src={url} alt='이미지 확인중' key={idx} />
                    </Box>
                  ))}
              </Box>
            </Box>
            <div className='text-center mt-10 mb-5'>
              <div className='text-center my-7'>
                <button className='btn'>
                  <Checkbox
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    checked={isLike}
                    onChange={handleChange}
                    color='error'
                  />
                </button>
              </div>
            </div>
          </Box>

          <Box style={{ display: 'flex', justifyContent: 'end', marginTop: 10 }}>
            <DeleteOrUpdate
              setPassword={setarticlePw}
              inputPassword={articlePw}
              password={password}
              url={'board/' + id}
              afterUrl='/community'
              updatePageUrl='/community/write'
              state={state}
              params={{ password }}
            />
          </Box>

          <Comments detailId={id} which='board' />
          <div className='text-center'>
            <Button
              onClick={() => navi('/community')}
              style={{
                backgroundColor: '#F93D59',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              목록
            </Button>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Detail;
