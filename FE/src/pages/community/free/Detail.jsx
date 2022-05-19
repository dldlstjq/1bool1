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
// import LikeButton from '../common/LikeButton';
import { Container, Grid, Typography, Box, Button, TextField } from '@mui/material';
import moment from 'moment';

import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Detail() {
  const state = useLocation().state;
  const [articlePw, setarticlePw] = useState('');
  const [isLike, setIsLike] = useState(false);
  const navi = useNavigate();
  const { title, content, modifiedDate, id, nickname, password, photo, cnt } = state;
  const userId = localStorage.getItem('user_id');
  let time = moment({ modifiedDate }).format('YYYY.MM.DD HH:mm');
  useEffect(() => {
    // 지금 로그인한 유저가 좋아요 누른 상품인지 확인하는 기능 필요
    if (localStorage.getItem('user_id') !== null) {
      axios({
        method: 'get',
        url: BASE_URL + `board/like/user/${id}`,
        params: {
          userId: localStorage.getItem('user_id'),
        },
      })
        .then((res) => {
          // console.log(res);
          if (res.data.object === true) setIsLike(true);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  function handleLike() {
    // setIsLike((prev) => !prev);
  }

  const handleChange = async (e) => {
    if (localStorage.getItem('user_id') === null) {
      alert('로그인을 해야 좋아요가 가능합니다!');
      return;
    }

    const likeCurrent = e.target.checked;
    setIsLike(likeCurrent);
    // e.preventDefault();

    try {
      await axios({
        method: 'post',
        url: BASE_URL + `board/like/${id}`,
        params: {
          user_id: localStorage.getItem('user_id'),
        },
      }).then((res) => {
        if (res.data.statusCode === 200) {
          console.log('좋아요 등록');
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <Appbar />
      <div style={{ flex: '1' }} className='lg:w-3/4 sm:w-11/12 mx-auto'>
        <Container>
          <Box
            sx={{
              // borderTop: 2,
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
              <Typography style={{ marginBottom: 10 }}>
                {' '}
                <AccountCircleIcon style={{ marginRight: 3, color: '#F93D59' }} />
                {nickname} | {time}{' '}
              </Typography>
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
              {/* <LikeButton
                url={'board/like/user/' + id}
                user_id={localStorage.getItem('user_id')}
                board_id={id}
              /> */}

              {/* {isLike ? (
                <Favorite
                  color="error"
                  style={{ width: "35px" }}
                  onClick={handleLike}
                />
              ) : (
                <FavoriteBorder
                  color="error"
                  style={{ width: "35px" }}
                  onClick={handleLike}
                />
              )} */}
            </div>
          </Box>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} md={6}></Grid> */}
            <Grid
              item
              xs={12}
              md={6}
              style={{
                display: 'flex',
                justifyContent: 'end',
                paddingRight: 10,
                marginTop: 10,
              }}
            >
              <Box style={{ display: 'flex', justifyContent: 'end' }}>
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
            </Grid>
          </Grid>

          <Comments detailId={id} which='board' />

          <Button
            onClick={() => navi('/community')}
            style={{
              backgroundColor: '#F93D59',
              color: 'white',
              fontWeight: 'bold',
            }}
            className='relative left-1/2 top-5'
          >
            목록
          </Button>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Detail;
