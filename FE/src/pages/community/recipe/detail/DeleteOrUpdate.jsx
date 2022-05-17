/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function DeleteOrUpdate({ password, afterUrl, state, updatePageUrl, url, params, refresh }) {
  const [inputPw, setInputPw] = useState('');
  const navi = useNavigate();

  function handleDelete() {
    if (inputPw === password) {
      axios({
        method: 'delete',
        url,
        params,
      })
        .then(() => {
          if (afterUrl) setTimeout(() => navi(afterUrl), 1000);
          else {
            setTimeout(() => refresh((prev) => (prev += 1)), 1000);
          }
        })
        .catch((err) => console.log(err));
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
    <div className='grid grid-cols-3 gap-2 my-4'>
      <input
        type='password'
        className=' text-white  h-10'
        placeholder='비밀번호'
        name='articlePw'
        onChange={(e) => setInputPw(e.target.value)}
        style={{ backgroundColor: '#ffe2e180', borderRadius: 20 }}
      />
      <button
        id='delete'
        className='bg-gray-700 text-white  h-10'
        onClick={handleDelete}
        style={{ backgroundColor: '#f93d59', borderRadius: 20 }}
      >
        삭제
      </button>
      <button
        id='update'
        className='bg-gray-700 text-white h-10'
        onClick={toUpdatePage}
        style={{ backgroundColor: '#f93d59', borderRadius: 20 }}
      >
        수정
      </button>
    </div>
  );
}
