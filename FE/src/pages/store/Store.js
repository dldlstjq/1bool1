import { Container } from '@mui/material';
import React from 'react';
import Appbar from '../../components/main/Appbar';
import Footer from '../../components/main/Footer';

function Store() {
  return (
    <div style={{display: 'flex', flexDirection:'column', minHeight:'100%'}}>
    <Appbar/>
      <div style={{flex:'1'}}>
        <Container>
          <form>
            <input type="text" placeholder="상품을 입력하세요" autoFocus />
            <button type="reset" className="btn-reset"></button>
          </form>
        </Container>
      </div>
      <Footer/>
    </div>
  );
}

export default Store;