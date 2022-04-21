import React, { useState } from 'react';
import Appbar from '../../components/main/Appbar';
import { Button, Container, Grid, TextField, Typography} from '@mui/material';
import logo from '../../common/logo.png'

function Main() {
  const [word, setWord] = useState("");

  const onSubmit = async () => {
    window.location.href = "/store/" + word;
  };

  return (
    <div style={{display: 'flex', flexDirection:'column', minHeight:'100%'}}>
        <Appbar/>
        <div style={{flex:'1'}}>
          <Container>
            <Grid container spacing={2} sx={{mt:5}}>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" style={{fontWeight:'bold'}}>
                  오늘의 할인은?
                </Typography>
                <Typography variant="h6" style={{fontWeight:'bold'}}>
                  편의점의 할인 상품들을 알려드려요!
                </Typography>
                <TextField label="상품을 검색하세요" variant="standard">
                <input onChange={(e) => { setWord(e.target.value); console.log(word); }}></input>

                  <Button type="button" onClick={() => { onSubmit(); }}></Button>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
              <img src={logo} alt="logo" style={{}}/>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    );
}

export default Main;