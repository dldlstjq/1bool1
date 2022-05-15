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
import { Container, Grid, Typography, Box, Button, TextField} from '@mui/material';
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
import Chip from '@mui/material/Chip';
import './Store.css';
import { FcMoneyTransfer } from "react-icons/fc";
import { FaWonSign, FaCoins } from "react-icons/fa";


function Store() {
  const [goods, setGoods] = useState([]);
  const [page, setPage] = useState(1);
  // const [word, setWord] = useState("");
  // const [items, setItems] = useState(5);
  // const prevRef = useRef(null);
	// const nextRef = useRef(null);
  const handlePageChange = (page) => { setPage(page); };
  // let adr = 'https://k6d207.p.ssafy.io/api/v1/goods/gs/2'
  // const [word, setWord] = useState({
  //   goodName : '0',
  // });
  const [word, setWord] = useState();
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
    console.log(event)
    setWord(event.target.value);
    console.log(word, event)
  }
  // const { goodName } = word;
  const onSubmit = () => {
    let conv = ''
    let event_type = ''
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
      // console.log(conv)
      
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
    // console.log('adr확인중', conv, event_type, goodName, goodName.type)
    // let adr = `https://k6d207.p.ssafy.io/api/v1/goods/conGoods?convinenceName=${conv}&event=${event_type}&goods=${goodName}`
    let adr = `https://k6d207.p.ssafy.io/api/v1/goods/conGoods?convinenceName=${conv}&event=${event_type}&goods=${word}`
    
    axios
    .get(adr)
    .then(({data}) => {
      setGoods(data.object)
      console.log(data.object)
    })
    
  }
  
  
  useEffect(() => {
    axios
    .get('https://k6d207.p.ssafy.io/api/v1/goods/conGoods?convinenceName=all&event=0&goods=0')
    .then(({data}) => {
      setGoods(data.object)
      console.log(data.object)
    })
  }, []);
  
  const eventGoods = {'1':'행사안함', '2':'1+1', '3': '2+1', '4': '3+1', '5': 'SALE', '6': '덤증정', '7': '균일가' }
  const convName = { 'MS' : 'ministop', 'cu' : 'CU', 'gs': 'GS', 'se':'seleven', 'cs':'cspace', 'EM':'emart' }
  const conName = { 'MS' : 'MINISTOP', 'cu' : 'CU', 'gs': 'GS25', 'se':'7-ELEVEn', 'cs':'CSPACE24', 'EM':'emart24' }
  function changeSet(sen) {
    let conv = convName[sen]
    // console.log(sen,conv,typeof(conv), typeof(sen))
    return conv
  }
  function changebox(w) {
    let con = conName[w]
    return con
  }
  // function changeEvent(e) {
  //   let even = eventGoods(e)

  // }
  const onKeyPress= (e) => {
    if (e.key === 'Enter'){
      onSubmit();
    }
  }

  return (
    <div style={{display: 'flex', flexDirection:'column', minHeight:'100%'}}>
    <Appbar/>
      <div style={{flex:'1',}}>
        <Container>
          <Box maxWidth='md' sx={{ border:2, borderColor:'#F93D5950', padding:'1rem', paddingLeft:'2rem', margin:'0 auto', marginTop:'2rem', borderRadius: '30px' }}>
          {/* <Box sx={{backgroundColor:'#F93D5910', display: 'flex', flexDirection:'column', justifyContent:'center', alignItems: "center"}}> */}
          <FormGroup aria-label="position" row style={{marginBottom:'1rem'}}>
                {/* <FormLabel component="legend" style={{borderColor:'#F93D59', borderWidth:'1'}}>편의점   </FormLabel> */}
                <Typography style={{width:'80px', padding:'0.5rem',textAlign: "center", marginRight:'2rem', color:'#F93D59',borderWidth:1, borderColor:'#F93D59', borderRadius:10, fontWeight:'bold'}}>편의점</Typography>
                <FormControlLabel
                  control={ <Checkbox checked={all} onChange={handleChange} name="all" sx={{}} /> } label="전체" />
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

          </FormGroup>
          <FormGroup aria-label="position" row style={{border:1}}>
          {/* <Typography style={{width:'80px', padding:'0.5rem',textAlign: "center", marginRight:'2rem', backgroundColor:'#F93D59', color:'white', borderRadius:10, fontWeight:'bold'}}>행사</Typography> */}
          <Typography style={{width:'80px', padding:'0.5rem',textAlign: "center", marginRight:'2rem', color:'#F93D59',borderWidth:1, borderColor:'#F93D59', borderRadius:10, fontWeight:'bold'}}>행사</Typography>
              <FormControlLabel
                control={ <Checkbox checked={allEvent} onChange={handleChange} name="allEvent" sx={{'&:hover': {backgroundColor:'red'}}} /> } label="전체" />
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
            <Box style={{ display: 'flex', flexDirection:'row',justifyContent:'center', marginTop:'1rem'}}>
                  {/* <input onChange={searchWord} name="goodName" placeholder="상품을 입력하세요" style={{borderBottom :'teal 1px solid', borderLeft:'none',}} ></input> */}
                  <TextField onChange={searchWord} onKeyPress={onKeyPress} id="standard-basic" label="Standard" variant="standard" />
            <Button  onClick={onSubmit} style={{backgroundColor:'#F93D59', color:'white', fontWeight:'bold', borderRadius:20, height:'2rem', marginTop:'1rem'}} name="adr">검색</Button>
            </Box>
          </Box>
          <Box style={{marginTop:10}}>
`           <Grid container spacing={2} >
              {goods.slice(30*(page-1), 30*(page-1)+30).map((good, index) => 
              <Grid item xs={12} md={6} lg={4} style={{padding:0, display:'flex', justifyContent:'center', paddingTop:'1rem' }}>
                    <Link to={`/${good.id}`} style={{textDecoration:'none',}}>
                <Card className={good.convinence} sx={{boxShadow:'none', borderRadius: '16px', display:'flex', flexDirection:'column' }}>
                  <div style={{height:'100%'}}>
                        <Box className={changeSet(good.convinence)} style={{paddingLeft:'1rem'}} >
                          {changebox(good.convinence)}
                        </Box>
                        {/* </Link> */}
                  {/* </div> */}
                    {/* <Link to={`/${good.id}`} style={{textDecoration:'none',}}> */}
                  <Box style={{display:'flex'}}>
                      <CardMedia
                        component="img"
                        alt="이미지 준비중"
                        sx={{ width: '45%', height:'45%' }}
                        image={`${good.photoPath}`}
                      />
                    {/* </Link>
                    <Link to={`/${good.id}`} style={{textDecoration:'none',}}> */}
                      <Box sx={{display:'flex', flexDirection:'column', paddingTop:'1rem', marginLeft:'0.5rem', marginRight:'0.5rem'}}>
                        <Typography gutterBottom variant="h7" component="div" style={{fontWeight:'bold'}}>
                          {good.name}
                        </Typography>
                        <Typography gutterBottom variant="h8" component="div" style={{display:'flex', flexDirection:'row', alignItem:'baseline', marginTop:'0.5rem' }} >
                         <FaCoins size='18' color='gold' style={{marginTop:2, marginRight:'5'}} />   {good.price}원
                        </Typography>
                        <Box className={changeSet(good.convinence)} sx={{width:'5rem', borderRadius: '10px', textAlign:'center', fontWeight:'bold'}} >
                          {eventGoods[good.event]}
                          
                        </Box>

                      </Box>

                  </Box>
                  </div>
                </Card>
                    </Link>
              </Grid>
              )}
            </Grid>

          </Box>
        <Pagination
          activePage={page}
          itemsCountPerPage={30}
          totalItemsCount={goods.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          >
        </Pagination>
        </Container>
      </div>
      <Footer/>
    </div>
  );
}

export default Store;