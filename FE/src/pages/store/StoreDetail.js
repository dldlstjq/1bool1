/* eslint-disable no-unused-vars */

import React from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Container, Grid, Typography, Box, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { pink } from '@mui/material/colors';
import {
  useFetchHit,
  useFetchItem,
  useFetchListAndUpdate,
} from '../../pages/community/common/hooks';

import { BASE_URL } from '../../index';
import axios from 'axios';

import Popover from '../../pages/community/common/Popover';
import GoodsComments from '../../pages/community/common/GoodsComments';
import { DeleteOrUpdate } from '../../pages/community/common/comment/DeleteOrUpdate';

import Appbar from '../../components/main/Appbar';
import Footer from '../../components/main/Footer';

import './StoreDetail.css';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function StoreDetail() {
  const location = useLocation();
  let goods = {};
  if (location.state !== null) {
    goods = location.state.data;
    localStorage.setItem('goodsId', goods.id);
  }
  // console.log(location.state);

  // const [goodsData, setGoodsData] = useState({});
  // const [reviewData, setReviewData] = useState([]);
  const { articleId } = useParams();
  const [popover, setpopover] = useState(false);
  const [showcomments, setshowcomments] = useState(true);
  const [foo, refresh] = useState(0);
  const [invokeUseEffect, setInvokeUseEffect] = useState(0);
  const [articlePw, setarticlePw] = useState('');
  const [isLike, setIsLike] = useState(false);

  const coordRef = useRef([0, 0]);
  const textareaRef = useRef();
  const navi = useNavigate();

  useEffect(() => {
    // axios({
    //   method: 'get',
    //   url: BASE_URL + `goods/${localStorage.getItem('goodsId')}`,
    // })
    //   .then((res) => {
    //     setGoodsData(res.data.object);
    //   })
    //   .catch((err) => console.log(err));
    // axios({
    //   method: 'get',
    //   url: BASE_URL + `goodsreview/${localStorage.getItem('goodsId')}`,
    // })
    //   .then((res) => {
    //     setReviewData(res.data.object);
    //   })
    //   .catch((err) => console.log(err));
    // axios.put(BASE_URL + `goods/${goods.id}`).then(() => {
    //   console.log('조회수 등록');
    // });
    // 지금 로그인한 유저가 좋아요 누른 상품인지 확인하는 기능 필요
    if (localStorage.getItem('user_id') !== null) {
      axios({
        method: 'get',
        url: BASE_URL + `goods/like/user/${goods.id}`,
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
  }, [goods.id]);

  // const goodsData = useFetchItem(`goods/${localStorage.getItem('goodsId')}`);
  const comments = useFetchListAndUpdate(
    `goodsreview/${localStorage.getItem('goodsId')}`,
    invokeUseEffect
  );
  // const hits = useFetchHit(`goods/${localStorage.getItem('goodsId')}`);
  // const like = useFetchLike(`goods/${goods.id}`);

  const convName = {
    MS: 'MINISTOP',
    CU: 'CU',
    GS: 'GS25',
    SE: '7-ELEVEn',
    CS: 'CSPACE24',
    EM: 'emart24',
  };

  const showEvent = {
    1: '행사안함',
    2: '1+1',
    3: '2+1',
    4: '3+1',
    5: 'SALE',
    6: '덤증정',
    7: '균일가',
  };

  const {
    id,
    createdDate,
    modifiedDate,
    name,
    price,
    photoPath,
    photo,
    isSell,
    event,
    hit,
    convinence,
  } = goods;

  console.log(goods);
  //  console.log(goodsData[0]);

  //   "id": 6438,
  //   "createdDate": "2022-05-11 21:30:28.545944",
  //   "modifiedDate": "2022-05-11 21:30:28.546002",
  //   "name": "맛있다)곤약젤리복숭아150g",
  //   "price": 2000,
  //   "photoPath": "https://emart24.co.kr/upload/eventProduct/202205/8809293682472.jpg",
  //   "description": null,
  //   "category": null,
  //   "isSell": 1,
  //   "event": 2,
  //   "hit": null,
  //   "convinence": "EM",

  const str = String(price);
  let strPrice;
  if (str.length === 4) strPrice = str.substring(0, 1) + ',' + str.substring(1, str.length);
  // console.log(str.slice(0, 1) + ',' + str.slice(str.length - 3, str.length));
  else strPrice = str.slice(0, 2) + ',' + str.slice(2, str.length);

  function handleClick(e) {
    const { target, clientX, clientY } = e;
    if (target.matches('#show-comments')) {
      setshowcomments((prev) => !prev);
    }
    // if (target.matches('#report')) {
    //   coordRef.current = [clientX, clientY];
    //   setpopover(true);
    // } else {
    //   setpopover(false);
    // }
    if (target.matches('#focus')) {
      setshowcomments((prev) => true);
      setTimeout(() => {
        textareaRef.current.focus();
      }, 500);
    }
    // if (target.matches("#delete")) {
    //   if (articlePw === password) {
    //     deleteReq(`board/${id}`, articlePw);
    //     navi("/community/free");
    //     return;
    //   }
    //   alert("비밀번호가 다릅니다");
    // }
    // if (target.matches("#update")) {
    //   if (articlePw === password) {
    //     navi("/community/free/write", {
    //       state: {
    //         articleId,
    //         nickname,
    //         password,
    //         title,
    //         content,
    //       },
    //     });
    //     return;
    //   }
    //   alert("비밀번호가 다릅니다");
    // }
  }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   console.log(e.target);
  //   const method = "abc";
  //   const data = new FormData(e.target);
  //   if (data.get("password") !== password) {
  //     alert("비밀번호가 다릅니다");
  //     return;
  //   }
  //   axios({
  //     method,
  //     url: BASE_URL + "board/" + articleId,
  //     data.append('boardId',articleId)
  //     data: {
  //       nickname: data.get("nickname"),
  //       password: data.get("password"),
  //       content: data.get("content"),
  //       boardId: articleId,
  //     },
  //   });
  // }

  // function handleCommentSubmit(e) {
  //   e.preventDefault();
  //   const data = new FormData(e.target);
  //   console.log('hi');
  //   axios({
  //     method: 'post',
  //     url: BASE_URL + 'goodsreview/' + id,
  //     data: {
  //       nickname: data.get('nickname'),
  //       password: data.get('password'),
  //       content: data.get('content'),
  //       goodsId: id,
  //     },
  //   })
  //     .then(() => setInvokeUseEffect((prev) => prev + 1))
  //     .catch((err) => console.log(err));
  // }

  // async function handleCommentSubmit(e) {
  //   e.preventDefault();
  //   const data = new FormData(e.target);
  //   data.append("boardId", id);
  //   const res = await axiosRequest(
  //     `comment/${id}`,
  //     "post",
  //     null,
  //     data,
  //     "application/json"
  //   );
  //   console.log(res);
  // }

  const handleChange = async (e) => {
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
          method: 'put',
          url: BASE_URL + `goods/like/${localStorage.getItem('goodsId')}`,
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
    } else {
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <Appbar />
      <div style={{ flex: '1', marginTop: 30 }}>
        <Container>
          <div onClick={handleClick} onWheel={() => setpopover(false)}>
            {/* <strong className='detail-title'>{name}</strong>
            <div style={{ padding: '0.5rem 0', borderBottom: '1px solid #323232' }}>
              <div className='author-and-date'>최근 수정 일시 | {modifiedDate?.split('.')[0]}</div>
              <div className='icons'>
                <i className='icon-box icon-info icon-views w-5 h-5 relative top-1'></i>
                21
                <i className='icon-box icon-comment icon-info w-5 h-5 relative top-1'></i>
                {comments.length}
                <i className='icon-box icon-up icon-info w-5 h-5'></i>22
                <i className='icon-box icon-down icon-info w-5 h-5 relative top-1'></i>
                22
              </div>
            </div>
            <div className='relative mt-1'>
              <i className='icon-box icon-sns w-20 h-6 absolute right-0'></i>
            </div> */}
            <div className='content-box'>
              {convName[convinence] === 'CU' && (
                <div id='CU' className='grey'>
                  {convName[convinence]}
                </div>
              )}
              {convName[convinence] === 'MINISTOP' && (
                <div id='MS' className='grey'>
                  {convName[convinence]}
                </div>
              )}
              {convName[convinence] === 'GS25' && (
                <div id='GS' className='grey'>
                  {convName[convinence]}
                </div>
              )}
              {convName[convinence] === 'emart24' && (
                <div id='EM' className='grey'>
                  {convName[convinence]}
                </div>
              )}
              {convName[convinence] === 'CSPACE24' && (
                <div id='CS' className='grey'>
                  {convName[convinence]}
                </div>
              )}
              {convName[convinence] === '7-ELEVEn' && (
                <div id='SE' className='grey'>
                  {convName[convinence]}
                </div>
              )}
              {/* <Grid container spacing={2} columns={16}>
                <Grid item xs={8}> */}
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <img
                  style={{
                    display: 'block',
                    margin: '0px auto',
                    width: '28%',
                    height: '28%',
                  }}
                  src={photoPath}
                  alt={name}
                />
              </Box>
              <Box sx={{ flexGrow: 1, display: { lg: 'none', md: 'none' } }}>
                <img
                  style={{
                    display: 'block',
                    margin: '0px auto',
                  }}
                  src={photoPath}
                  alt={name}
                />
              </Box>

              {/* </Grid> */}
              {/* <Grid item xs={8}> */}
              <p id='goodsTitle'>{name}</p>
              <p id='goodsPrice'>{strPrice}원</p>
              <p id='goodsEvent'>{showEvent[event]} </p>
              {/* </Grid> */}
              {/* </Grid> */}
              {/* <Box style={{ display: 'flex', justifyContent: 'center' }}>
                <img src={photoPath} alt={name} />
                <p style={{ margin: '1.8rem 0' }}>{name}</p>
                <p style={{ margin: '1.8rem 0' }}>{price}</p>
              </Box> */}
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
                  {/* <i className='icon-box icon-info icon-up  w-5 h-5'></i> 0 */}
                </button>
                {/* <button className='btn'>
                  <i className='icon-box icon-info icon-down  w-5 h-5'></i> 0
                </button> */}
              </div>
              {/* <div className='userinfo-box' style={{ backgroundColor: '#ffe2e180' }}>
                <i className='icon-box icon-etc icon-user  w-10 h-10'></i>
                <div style={{ marginLeft: '1rem' }}>
                  <span style={{ marginLeft: '5px' }}>{name}</span>
                  <div className='icons'>
                    <i className='icon-box icon-info icon-article w-5 h-5 relative top-1'></i>
                    21
                    <i className='icon-box icon-comment icon-info w-5 h-5 ml-1 relative top-1'></i>
                    {comments.length}
                  </div>
                </div>
              </div> */}
              {/* <DeleteOrUpdate
         setPw={setarticlePw}
         inputPw={articlePw}
         pw={password}
         id={articleId}
         afterUrl='/community'
         updatePageUrl='/community/free/write'
         state={articleData}
       /> */}
              <div className='flex justify-between'>
                <span id='show-comments' className='cursor-pointer'>
                  <div className='mt-2' id='show-comments'>
                    {showcomments ? (
                      <i className='icon-box icon-info icon-up w-5 h-5' id='show-comments'></i>
                    ) : (
                      <i className='icon-box icon-info icon-down w-5 h-5' id='show-comments'></i>
                    )}
                    댓글 {comments.length}
                  </div>
                </span>
                <div>
                  {/* <span id='report' className='cursor-pointer'>
                    신고
                    <i
                      className='icon-box icon-info icon-down w-5 h-5 relative top-1'
                      id='report'
                    ></i>
                  </span> */}
                  {/* <button
                    className='bg-gray-700 text-white w-20 h-10 ml-4'
                    id='focus'
                    style={{ backgroundColor: '#f93d59' }}
                  >
                    댓글
                  </button> */}
                </div>
              </div>
            </div>
            {showcomments && (
              <GoodsComments
                comments={comments}
                articleId={articleId}
                goodsId={id}
                ref={textareaRef}
                url={'/goodsreview/' + id}
                refresh={refresh}
              />
            )}

            <button
              className='bg-gray-700 text-white w-20 h-10 mt-5'
              style={{ backgroundColor: '#f93d59' }}
              onClick={() => navi('/store')}
            >
              목록보기
            </button>

            {popover && (
              <Popover x={coordRef.current[0]} y={coordRef.current[1]}>
                <h6>ㅇㅇ</h6>
              </Popover>
            )}
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default StoreDetail;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
