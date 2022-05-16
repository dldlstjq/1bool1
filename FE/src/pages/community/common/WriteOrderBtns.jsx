/* eslint-disable no-unused-vars */
import { Button, Box } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab'
import React, { useState } from 'react';

function ButtonAndPerPage() {
  const [value, setValue] = useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div style={{marginBottom:'1rem'}}>
      <Box style={{display:'flex', flexDirection:'column', justifyContent:'between'}}>
        <Tabs
          value={value}
          onChange={handleChange}
          sx = {{
            '& .MuiTabs-indicator': {
              backgroundColor: '#F93D59',
            },
            display:'flex'
          }}
          inBarStyle={{background:'#F93D59'}}
        >
          <Tab id="order-by-like" label="최신등록순" sx = {{ '&.Mui-selected': { color: '#F93D59' }, fontWeight:'bolder', fontSize:'1rem' }} />
          <Tab id="order-by-like" label="좋아요순" sx = {{ '&.Mui-selected': { color: '#F93D59' }, fontWeight:'bolder',fontSize:'1rem' }} />
          <Tab id="order-by-like" label="북마크" sx = {{ '&.Mui-selected': { color: '#F93D59' }, fontWeight:'bolder',fontSize:'1rem' }} />
        </Tabs>

      <Button id="write" style={{ display:'flex', marginLeft:'auto', backgroundColor:'#F93D59', color:'white', fontWeight:'bold', borderRadius:10, height:'2rem'}} >글쓰기</Button>
      </Box>
    </div>
  );
}

export default ButtonAndPerPage;
