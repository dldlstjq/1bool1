/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Appbar from '../../components/main/Appbar';
import Footer from '../../components/main/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import { Button, Container, Grid, TextField, Typography, Box} from '@mui/material';
import { Container, Grid, Typography, Box, Button} from '@mui/material';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';
import Pagination from "react-js-pagination";
import styled from 'styled-components'
import '../../components/store/Paging.css';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';


function Store() {
  const [goods, setGoods] = useState([]);
  const [page, setPage] = useState(1);
  // const [word, setWord] = useState("");
  // const [items, setItems] = useState(5);
  // const prevRef = useRef(null);
	// const nextRef = useRef(null);
  const eventGoods = {'1':'행사안함', '2':'1+1', '3': '2+1', '4': '3+1', '5': 'SALE', '6': '덤증정', '7': '균일가' }
  const handlePageChange = (page) => { setPage(page); };
  // let adr = 'https://k6d207.p.ssafy.io/api/v1/goods/gs/2'
  const [word, setWord] = useState({
    goodName : '0',
  });
  const [state, setState] = useState({
      all: false,
      cu : false,
      gs : false,
      em : false,
      se : false,
      ms : false,
      cs : false,
      allEvent: false,
      noEvent : false,
      one : false,
      two : false,
      three : false,
      sale : false,
      dum : false,
      noSale : false,
  });
  
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
    // setValue(event.target.value);
    // console.log(value)
  };
  const { all, cu, gs, em, se, ms, cs, allEvent, noEvent, one, two, three, sale, dum, noSale } = state;
  const searchWord = (event) => {
    setWord({
      [event.target.name]: event.target.value,
    });
  }
  const { goodName } = word;
  let conv = ''
  let event_type = ''
  const onSubmit = () => {
    if (cu) { conv += 'cu' }
    if (gs) {
      if (conv.length) { conv += '_gs' }
      else { conv += 'gs'} }
    if (em) {
      if (conv.length) { conv += '_em' }
      else { conv += 'em'} }
    if (se) {
      if (conv.length) { conv += '_se' }
      else { conv += 'se'} }
    if (ms) {
      if (conv.length) { conv += '_ms' }
      else { conv += 'ms'} }
    if (cs) {
      if (conv.length) { conv += '_cs' }
      else { conv += 'cs'} }
    if (all || conv === '' ) { conv = 'all' }
    console.log(conv)

    if (noEvent) { event_type += '1' }
    if (one) {
      if (event_type.length) { event_type += '_2' }
      else { event_type += '2'} }
    if (two) {
      if (event_type.length) { event_type += '_3' }
      else { event_type += '3'} }
    if (three) {
      if (event_type.length) { event_type += '_4' }
      else { event_type += '4'} }
    if (sale) {
      if (event_type.length) { event_type += '_5' }
      else { event_type += '5'} }
    if (dum) {
      if (event_type.length) { event_type += '_6' }
      else { event_type += '6'} }
    if (noSale) {
      if (event_type.length) { event_type += '_7' }
      else { event_type += '7'} }
    if (allEvent || event_type === '') { event_type = '0' } 
    console.log('adr확인중', conv, event_type)
    // let adr = `https://k6d207.p.ssafy.io/api/v1/goods/${conv}/${event_type}/${goodName}`
    let adr = `https://k6d207.p.ssafy.io/api/v1/goods/convinence?con=cu`
    axios
      .get(adr)
      .then(({data}) => {
        setGoods(data.object)
        console.log(data.object)
      })

  }
  // const findChange = () => {
  //   console.log(all, cu, gs)
  // }
  // const itemChange = (e) => {
  //   setItems(Number(e.target.value))

  // }
  // const items = 20
// console.log(items*(page-1), items*(page-1)+items)

  useEffect(() => {
    axios
      // .get('https://k6d207.p.ssafy.io/api/v1/goods/all/1_2_3_4_5_6_7/0')
      .get('https://k6d207.p.ssafy.io/api/v1/goods/convinence?con=cu')
      .then(({data}) => {
        setGoods(data.object)
      })
  }, []);

  return (
    <div style={{display: 'flex', flexDirection:'column', minHeight:'100%'}}>
    <Appbar/>
      <div style={{flex:'1'}}>
        <Container>
          <Box sx={{backgroundColor:'#F93D5910'}}>
          {/* <Box sx={{backgroundColor:'#F93D5910', display: 'flex', flexDirection:'column', justifyContent:'center', alignItems: "center"}}> */}
          <FormGroup aria-label="position" row style={{paddingLeft:'4rem'}}>
            {/* <Grid container spacing={3} >
              <Grid item xs={0} md={1}  >
              </Grid>
              <Grid item md={1} xs={1} > */}
                <FormLabel component="legend" style={{borderColor:'#F93D59', borderWidth:'1'}}>편의점   </FormLabel>
              {/* </Grid>
              <Grid item xs={10} md={10} > */}
                <FormControlLabel
                  control={ <Checkbox checked={all} onChange={handleChange} name="all" /> } label="전체" />
                <FormControlLabel
                  control={ <Checkbox checked={cu} onChange={handleChange} name="cu" />} label="CU" />
                <FormControlLabel
                  control={<Checkbox checked={gs} onChange={handleChange} name="gs" /> } label="GS25" />
                <FormControlLabel
                  control={<Checkbox checked={em} onChange={handleChange} name="em" /> } label="이마트24" />
                <FormControlLabel
                  control={<Checkbox checked={se} onChange={handleChange} name="se" /> } label="세븐일레븐" />
                <FormControlLabel
                  control={<Checkbox checked={ms} onChange={handleChange} name="ms" /> } label="미니스톱" />
                <FormControlLabel
                  control={<Checkbox checked={cs} onChange={handleChange} name="cs" /> } label="씨스페이스" />
              {/* </Grid>

            </Grid> */}


          </FormGroup>
          <FormGroup aria-label="position" row>
            <FormLabel component="legend">행사  </FormLabel>
              <FormControlLabel
                control={ <Checkbox checked={allEvent} onChange={handleChange} name="allEvent" /> } label="전체" />
              <FormControlLabel
                control={ <Checkbox checked={noEvent} onChange={handleChange} name="noEvent" />} label="정가" />
              <FormControlLabel
                control={<Checkbox checked={one} onChange={handleChange} name="one" /> } label="1+1" />
              <FormControlLabel
                control={<Checkbox checked={two} onChange={handleChange} name="two" /> } label="2+1" />
              <FormControlLabel
                control={<Checkbox checked={three} onChange={handleChange} name="three" /> } label="3+1" />
              <FormControlLabel
                control={<Checkbox checked={sale} onChange={handleChange} name="sale" /> } label="세일" />
              <FormControlLabel
                control={<Checkbox checked={dum} onChange={handleChange} name="dum" /> } label="덤증정" />
              <FormControlLabel
                control={<Checkbox checked={noSale} onChange={handleChange} name="noSale" /> } label="균일가" />
            
            </FormGroup>


        <input onChange={searchWord} name="goodName" placeholder="상품을 입력하세요" ></input>
            <Button type="button" onClick={onSubmit} name="adr">버튼버튼</Button>
          </Box>
          <Grid container spacing={2} >
            {goods.slice(30*(page-1), 30*(page-1)+30).map(good => 
            <Grid item xs={12} md={6} lg={4} style={{padding:0, justifyContent:'center', paddingLeft:'2.3rem', paddingTop:'1rem'}}>
                <Card sx={{justifyContent:'center', width: 300, height: 130, boxShadow:0, border: 1, borderColor: 'grey.300', borderRadius: '16px', display:'flex' }} center>
              <Link to={`/${good.id}`} style={{textDecoration:'none',}}>
                  {/* <Box sx={{display: 'felx', flexDirection:'column', width:180, height:180}}> */}
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      sx={{ width: 100, height:120 }}
                      image={`${good.photoPath}`}
                      />
                    {/* </Box> */}
                    </Link>
                    <Link to={`/${good.id}`} style={{textDecoration:'none',}}>
                    <Box sx={{display:'flex', flexDirection:'column'}}>
                  {/* <CardContent> */}
                    <Typography gutterBottom variant="h8" component="div">
                      {good.name}
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div" style={{fontWeight:'bold'}}>
                      {good.price}원
                      {good.convinence}
                      {eventGoods[good.event]}
                    </Typography>
                  {/* </CardContent> */}
                  </Box>
              </Link>
                </Card>
            </Grid>
            )}
          </Grid>
          {/* <PaginationBox> */}
        <Pagination
          activePage={page}
          itemsCountPerPage={30}
          // totalItemsCount={goods.length-1}
          totalItemsCount={goods.length}
          // pageRangeDisplayed={parseInt(goods.length/30)+1}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          >
        </Pagination>
      {/* </PaginationBox> */}
        </Container>
      </div>
      <Footer/>
    </div>
  );
}

// const PaginationBox = styled.div`
//   .pagination { display: flex; justify-content: center; margin-top: 15px;}
//   ul { list-style: none; padding: 0; }
//   ul.pagination li {
//     display: inline-block;
//     width: 30px;
//     height: 30px;
//     border: 1px solid #e2e2e2;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     font-size: 1rem; 
//   }
//   ul.pagination li:first-child{ border-radius: 5px 0 0 5px; }
//   ul.pagination li:last-child{ border-radius: 0 5px 5px 0; }
//   ul.pagination li a { text-decoration: none; color: #337ab7; font-size: 1rem; }
//   ul.pagination li.active a { color: white; }
//   ul.pagination li.active { background-color: #337ab7; }
//   ul.pagination li a:hover,
//   ul.pagination li a.active { color: blue; }

//   `
export default Store;