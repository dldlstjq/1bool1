/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';

export function DeleteOrUpdate({
  password,
  goodsId,
  id,
  refresh,
  setInputMode,
  inputMode,
  inputRef,
}) {
  const [inputPw, setInputPw] = useState('');

  function handleDelete() {
    if (inputPw === password) {
      axios({
        method: 'delete',
        url: 'goodsreview/' + goodsId,
        params: { id, password },
      })
        .then(setTimeout(() => refresh((prev) => (prev += 1)), 1000))
      return;
    }
    alert('비밀번호가 다릅니다');
  }

  function readyUpdate() {
    if (inputMode === true) {
      setInputMode(false);
      return;
    } else if (inputPw === password) {
      setInputMode(() => true);
      inputRef.current.focus();
      return;
    }
    alert('비밀번호가 다릅니다');
  }

  return (
    <div className='grid-cols-3 gap-2 my-4'>
      <input
        type='password'
        className='h-7 rounded'
        placeholder='비밀번호'
        name='password'
        onChange={(e) => setInputPw(e.target.value)}
      />
      <button
        id='delete'
        className='bg-gray-700 text-white w-20 h-10'
        style={{ backgroundColor: '#f93d59', marginLeft: 10 }}
        onClick={handleDelete}
      >
        삭제
      </button>
      <button
        id='update'
        className='bg-gray-700 text-white w-20 h-10'
        style={{ backgroundColor: '#f93d59', marginLeft: 10 }}
        onClick={readyUpdate}
      >
        {inputMode ? '수정취소' : '수정'}
      </button>
    </div>
  );
}
