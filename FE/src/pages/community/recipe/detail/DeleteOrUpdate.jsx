/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';

export function DeleteOrUpdate({ password, afterUrl, state, updatePageUrl, url, params, refresh }) {
  const [inputPw, setInputPw] = useState('');
  const navi = useNavigate();

  function handleDelete() {
    if (inputPw === password) {
      axios({
        method: 'delete',
        url,
        params,
      }).then(() => {
        if (afterUrl) setTimeout(() => navi(afterUrl), 1000);
        else {
          setTimeout(() => refresh((prev) => (prev += 1)), 1000);
        }
      });

      return;
    }
    alert('비밀번호가 다릅니다');
  }

  function toUpdatePage() {
    if (inputPw === password) {
      navi(updatePageUrl, { state });
      return;
    }
    alert('비밀번호가 다릅니다');
  }

  return (
    <Box xs={{ display: 'flex', alignSelf: 'end' }}>
      <input
        type='password'
        className=' text-white  h-10'
        placeholder='비밀번호'
        name='articlePw'
        onChange={(e) => setInputPw(e.target.value)}
        style={{ backgroundColor: '#ffe2e180', borderRadius: 20 }}
      />
      <Button
        id='delete'
        onClick={handleDelete}
        style={{
          backgroundColor: 'white',
          borderRadius: 5,
          color: 'grey',
          border: '1px solid',
          marginRight: 10,
          fontWeight: 'bold',
        }}
      >
        삭제
      </Button>
      <Button
        onClick={toUpdatePage}
        style={{
          backgroundColor: 'white',
          color: 'grey',
          border: '1px solid',
          marginRight: 5,
          fontWeight: 'bold',
        }}
      >
        수정
      </Button>
    </Box>
  );
}
