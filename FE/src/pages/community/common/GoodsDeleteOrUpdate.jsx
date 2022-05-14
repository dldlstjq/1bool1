/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function DeleteOrUpdate({ password, goodsId, id, refresh, setInputMode }) {
  const [inputPw, setInputPw] = useState('');

  function handleDelete() {
    if (inputPw === password) {
      axios({
        method: 'delete',
        url: 'goodsreview/' + goodsId,
        params: { id, password },
      })
        .then(setTimeout(() => refresh((prev) => (prev += 1)), 1000))
        .catch((err) => console.log(err));
      return;
    }
    alert('비밀번호가 다릅니다');
  }

  function readyUpdate() {
    if (inputPw === password) {
      setInputMode(true);
      return;
    }
    alert('비밀번호가 다릅니다');
  }

  return (
    <div className='grid grid-cols-3 gap-2 my-4'>
      <input
        type='password'
        className='bg-gray-700 text-white h-10'
        placeholder='비밀번호'
        name='password'
        onChange={(e) => setInputPw(e.target.value)}
      />
      <button id='delete' className='bg-gray-700 text-white h-10' onClick={handleDelete}>
        삭제
      </button>
      <button id='update' className='bg-gray-700 text-white h-10' onClick={readyUpdate}>
        수정
      </button>
    </div>
  );
}