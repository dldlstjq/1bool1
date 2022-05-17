/* eslint-disable no-unused-vars */
import React, { useState,useRef, useEffect } from 'react';
import Appbar from '../../components/main/Appbar';
import Footer from '../../components/main/Footer';
import { Container, Grid, Typography, Box, Button, TextField} from '@mui/material';


const { kakao } = window;

function KakaoMap(props) {
  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };
        const map = new kakao.maps.Map(container, options);
    }, []);

  return (
    <div style={{display: 'flex', flexDirection:'column', minHeight:'100vh'}}>
     <Appbar/>
      <div style={{flex:'1',}}>
        <Container >
        <div id='myMap' style={{
            width: '500px', 
            height: '500px'
        }}></div>
        </Container>
      </div>
      <Footer/>
    </div>
  );
}

export default KakaoMap;