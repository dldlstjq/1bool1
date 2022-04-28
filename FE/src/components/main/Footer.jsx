import React from "react";
import logo2 from '../../common/logo2.png'
import './Footer.css'
import {  Container, Grid, } from '@mui/material';
// import { Button, Container, Grid, TextField, Typography, Box} from '@mui/material';


function Footer() {
  return (
    // <div style={{ background:'#F93D5933'}}>
    <div style={{ background:'#ffe2e180', marginTop: 'auto'}}>
      <Container >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
          <img src={logo2} alt="logo" style={{height:'5rem'}} />
          </Grid>
          <Grid item xs={12} md={6}>
          
          </Grid>

        </Grid>
      </Container>
    </div>
  );
}

export default Footer;