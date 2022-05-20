/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Appbar from '../../components/main/Appbar';
import Footer from '../../components/main/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';

import CardMedia from '@mui/material/CardMedia';

import { Container, Grid, Typography, Box, Button, TextField } from '@mui/material';

import Pagination from 'react-js-pagination';
import styled from 'styled-components';
import '../../components/store/Paging.css';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Chip from '@mui/material/Chip';
import './Store.css';
import { FcMoneyTransfer } from 'react-icons/fc';
import { FaWonSign, FaCoins } from 'react-icons/fa';

import { useNavigate, useLocation } from 'react-router-dom';

function Store() {
  const location = useLocation();
  const [goods, setGoods] = useState([]);
  const [page, setPage] = useState(1);
  let name = '';
  const handlePageChange = (page) => {
    setPage(page);
  };
  const [word, setWord] = useState({
    goodName: '0',
  });

  const [state, setState] = useState({
    all: false,
    cu: false,
    gs: false,
    em: false,
    se: false,
    ms: false,
    cs: false,
    allEvent: false,
    noEvent: false,
    one: false,
    two: false,
    three: false,
    sale: false,
    dum: false,
    noSale: false,
    book: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };
  const {
    all,
    cu,
    gs,
    em,
    se,
    ms,
    cs,
    allEvent,
    noEvent,
    one,
    two,
    three,
    sale,
    dum,
    noSale,
    book,
  } = state;

  function searchWord(event) {
    setWord({ goodName: event.target.value });
  }

  const { goodName } = word;
  function onSubmit() {
    let conv = '';
    let event_type = '';
    if (cu) {
      conv += 'cu';
    }
    if (gs) {
      if (conv.length) {
        conv += '_gs';
      } else {
        conv += 'gs';
      }
    }
    if (em) {
      if (conv.length) {
        conv += '_em';
      } else {
        conv += 'em';
      }
    }
    if (se) {
      if (conv.length) {
        conv += '_se';
      } else {
        conv += 'se';
      }
    }
    if (ms) {
      if (conv.length) {
        conv += '_ms';
      } else {
        conv += 'ms';
      }
    }
    if (cs) {
      if (conv.length) {
        conv += '_cs';
      } else {
        conv += 'cs';
      }
    }
    if (all || conv === '') {
      conv = 'all';
    }
    if (noEvent) {
      event_type += '1';
    }
    if (one) {
      if (event_type.length) {
        event_type += '_2';
      } else {
        event_type += '2';
      }
    }
    if (two) {
      if (event_type.length) {
        event_type += '_3';
      } else {
        event_type += '3';
      }
    }
    if (three) {
      if (event_type.length) {
        event_type += '_4';
      } else {
        event_type += '4';
      }
    }
    if (sale) {
      if (event_type.length) {
        event_type += '_5';
      } else {
        event_type += '5';
      }
    }
    if (dum) {
      if (event_type.length) {
        event_type += '_6';
      } else {
        event_type += '6';
      }
    }
    if (noSale) {
      if (event_type.length) {
        event_type += '_7';
      } else {
        event_type += '7';
      }
    }
    if (allEvent || event_type === '') {
      event_type = '0';
    }
    let adr = `${axios.defaults.baseURL}goods/conGoods?convinenceName=${conv}&event=${event_type}&goods=${goodName}`;
    if (book) {
      if (localStorage.getItem('user_id') !== null) {
        adr = `${axios.defaults.baseURL}goods/like/userlist?user_id=${localStorage.getItem(
          'user_id'
        )}`;
      } else {
        alert('좋아요 누른 목록을 확인하시려면 로그인을 해주세요!');
      }
    }

    axios.get(adr).then(({ data }) => {
      setGoods(data.object);
    });
  }
  if (location.state) {
    name = location.state;
  }

  useEffect(() => {
    axios
      .get(`${axios.defaults.baseURL}goods/conGoods?convinenceName=all&event=0&goods=${name}`)
      .then(({ data }) => {
        setGoods(data.object);
      });
  }, [name]);

  const eventGoods = {
    1: '행사안함',
    2: '1+1',
    3: '2+1',
    4: '3+1',
    5: 'SALE',
    6: '덤증정',
    7: '균일가',
  };
  const convName = { MS: 'ministop', CU: 'cu', GS: 'gs', SE: 'seleven', CS: 'cspace', EM: 'emart' };
  const conName = {
    MS: 'MINISTOP',
    CU: 'CU',
    GS: 'GS25',
    SE: '7-ELEVEn',
    CS: 'CSPACE24',
    EM: 'emart24',
  };
  function changeSet(sen) {
    let conv = convName[sen];
    return conv;
  }
  function changebox(w) {
    let con = conName[w];
    return con;
  }
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };
  function bookmark() {}

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Appbar />
      <div style={{ flex: '1' }}>
        <Container>
          <Box
            maxWidth='md'
            sx={{
              border: 2,
              borderColor: '#F93D5950',
              padding: '1rem',
              paddingLeft: '2rem',
              margin: '0 auto',
              marginTop: '2rem',
              borderRadius: '30px',
            }}
          >
            <FormGroup aria-label='position' row style={{ marginBottom: '1rem' }}>
              <Typography
                style={{
                  width: '80px',
                  padding: '0.5rem',
                  textAlign: 'center',
                  marginRight: '2rem',
                  color: '#F93D59',
                  borderWidth: 1,
                  borderColor: '#F93D59',
                  borderRadius: 10,
                  fontWeight: 'bold',
                }}
              >
                편의점
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={all}
                    onChange={handleChange}
                    name='all'
                    sx={{ '&.Mui-checked': { color: '#F93D59' } }}
                  />
                }
                label='전체'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={cu}
                    onChange={handleChange}
                    name='cu'
                    sx={{ '&.Mui-checked': { color: '#F93D59' } }}
                  />
                }
                label='CU'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={gs}
                    onChange={handleChange}
                    name='gs'
                    sx={{ '&.Mui-checked': { color: '#F93D59' } }}
                  />
                }
                label='GS25'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={em}
                    onChange={handleChange}
                    name='em'
                    sx={{ '&.Mui-checked': { color: '#F93D59' } }}
                  />
                }
                label='이마트24'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={se}
                    onChange={handleChange}
                    name='se'
                    sx={{ '&.Mui-checked': { color: '#F93D59' } }}
                  />
                }
                label='세븐일레븐'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={ms}
                    onChange={handleChange}
                    name='ms'
                    sx={{ '&.Mui-checked': { color: '#F93D59' } }}
                  />
                }
                label='미니스톱'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={cs}
                    onChange={handleChange}
                    name='cs'
                    sx={{ '&.Mui-checked': { color: '#F93D59' } }}
                  />
                }
                label='씨스페이스'
              />
            </FormGroup>
            <FormGroup aria-label='position' row style={{ marginBottom: '1rem' }}>
              <Typography
                style={{
                  width: '80px',
                  padding: '0.5rem',
                  textAlign: 'center',
                  marginRight: '2rem',
                  color: '#F93D59',
                  borderWidth: 1,
                  borderColor: '#F93D59',
                  borderRadius: 10,
                  fontWeight: 'bold',
                }}
              >
                행사
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allEvent}
                    onChange={handleChange}
                    name='allEvent'
                    sx={{ '&.Mui-checked': { color: '#F93D59' } }}
                  />
                }
                label='전체'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={noEvent}
                    onChange={handleChange}
                    name='noEvent'
                    sx={{ '&.Mui-checked': { color: '#F93D59' } }}
                  />
                }
                label='정가'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={one}
                    onChange={handleChange}
                    name='one'
                    sx={{ '&.Mui-checked': { color: '#F93D59' } }}
                  />
                }
                label='1+1'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={two}
                    onChange={handleChange}
                    name='two'
                    sx={{ '&.Mui-checked': { color: '#F93D59' } }}
                  />
                }
                label='2+1'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={three}
                    onChange={handleChange}
                    name='three'
                    sx={{ '&.Mui-checked': { color: '#F93D59' } }}
                  />
                }
                label='3+1'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={sale}
                    onChange={handleChange}
                    name='sale'
                    sx={{ '&.Mui-checked': { color: '#F93D59' } }}
                  />
                }
                label='세일'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={dum}
                    onChange={handleChange}
                    name='dum'
                    sx={{ '&.Mui-checked': { color: '#F93D59' } }}
                  />
                }
                label='덤증정'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={noSale}
                    onChange={handleChange}
                    name='noSale'
                    sx={{ '&.Mui-checked': { color: '#F93D59' } }}
                  />
                }
                label='균일가'
              />
            </FormGroup>
            <FormGroup aria-label='position' row style={{ border: 1 }}>
              <Typography
                style={{
                  width: '80px',
                  padding: '0.5rem',
                  textAlign: 'center',
                  marginRight: '2rem',
                  color: '#F93D59',
                  borderWidth: 1,
                  borderColor: '#F93D59',
                  borderRadius: 10,
                  fontWeight: 'bold',
                }}
              >
                좋아요
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={book}
                    onChange={handleChange}
                    name='book'
                    sx={{ '&.Mui-checked': { color: '#F93D59' } }}
                  />
                }
                label='좋아요 상품'
              />
            </FormGroup>

            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: '1rem',
              }}
            >
              <TextField
                onChange={searchWord}
                onKeyPress={onKeyPress}
                id='standard-basic'
                label='상품을 입력하세요'
                variant='standard'
                defaultValue={name}
              />
              <Button
                onClick={onSubmit}
                style={{
                  backgroundColor: '#F93D59',
                  color: 'white',
                  fontWeight: 'bold',
                  borderRadius: 20,
                  height: '2rem',
                  marginTop: '1rem',
                }}
                name='adr'
              >
                검색
              </Button>
            </Box>
          </Box>
          <Box style={{ marginTop: 30, marginLeft: 10 }}>
            <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
              {goods.length ? (
                goods.slice(30 * (page - 1), 30 * (page - 1) + 30).map((good, index) => (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={4}
                    style={{
                      padding: 0,
                      display: 'flex',
                      justifyContent: 'center',
                      paddingTop: '1rem',
                    }}
                  >
                    <Link
                      to={`/store/${good.id}`}
                      state={{ data: good }}
                      style={{ textDecoration: 'none' }}
                    >
                      <Card
                        className={good.convinence}
                        sx={{
                          boxShadow: 'none',
                          borderRadius: '16px',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <div style={{ height: '100%' }}>
                          <Box
                            className={changeSet(good.convinence)}
                            style={{ paddingLeft: '1rem' }}
                          >
                            {changebox(good.convinence)}
                          </Box>
                          <Box style={{ display: 'flex' }}>
                            <Box sx={{ width: '160px', height: '120px', marginTop: '1rem' }}>
                              <CardMedia
                                component='img'
                                alt='이미지 준비중'
                                sx={{ width: '80%', height: '80%' }}
                                image={`${good.photoPath}`}
                              />
                            </Box>
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                paddingTop: '1rem',
                                marginLeft: '0.5rem',
                                marginRight: '0.5rem',
                              }}
                            >
                              <Typography
                                gutterBottom
                                variant='h7'
                                component='div'
                                style={{ fontWeight: 'bold' }}
                              >
                                {good.name}
                              </Typography>
                              <Typography
                                gutterBottom
                                variant='h8'
                                component='div'
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  alignItem: 'baseline',
                                  marginTop: '0.5rem',
                                }}
                              >
                                <FaCoins
                                  size='18'
                                  color='gold'
                                  style={{ marginTop: 2, marginRight: '5' }}
                                />{' '}
                                {good.price}원
                              </Typography>
                              <Box
                                className={changeSet(good.convinence)}
                                sx={{
                                  width: '5rem',
                                  borderRadius: '10px',
                                  textAlign: 'center',
                                  fontWeight: 'bold',
                                }}
                              >
                                {eventGoods[good.event]}
                              </Box>
                            </Box>
                          </Box>
                        </div>
                      </Card>
                    </Link>
                  </Grid>
                ))
              ) : (
                <Box style={{ marginTop: '2rem', marginBottom: '1rem' }}>
                  <Typography variant='h6'>목록이 없습니다.</Typography>
                </Box>
              )}
            </Grid>
          </Box>
          <Pagination
            activePage={page}
            itemsCountPerPage={30}
            totalItemsCount={goods.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          ></Pagination>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Store;
