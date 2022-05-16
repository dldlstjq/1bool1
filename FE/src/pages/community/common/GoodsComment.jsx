import { useState, useRef } from 'react';

import axios from 'axios';

import { DeleteOrUpdate } from './GoodsDeleteOrUpdate';

/* eslint-disable no-unused-vars */
function Comment({ content, nickname, password, id, goodsId, boardId, recipeId, url, refresh }) {
  const [inputMode, setInputMode] = useState(false);
  const data = { id, nickname, password };
  const inputRef = useRef();
  function handleSubmit(e) {
    if (e.key === 'Enter') {
      axios({
        method: 'put',
        url: 'goodsreview/' + goodsId,
        data: {
          goodsId,
          content: e.target.value,
          id,
          nickname,
          password,
        },
      })
        .then(() => {
          setInputMode(false);
          console.log('수정됐나');
          refresh((prev) => (prev += 1));
        })
        .catch((err) => console.log(err));
    }
  }
  return (
    <div className='p-1 border border-stone-300'>
      <div className='flex justify-between'>
        <div>
          <i className='icon-box icon-etc icon-user w-9 h-9'></i>{' '}
          <span className='relative bottom-3'>{nickname}</span>
        </div>

        <div>
          <button className='w-16 h-8  bd-df'>
            <i className='icon-box icon-info icon-up w-5 h-5'></i> 0
          </button>
          <button className='w-16 h-8 ml-2 bd-df'>
            <i className='icon-box icon-info icon-down w-5 h-5'></i> 0
          </button>
        </div>
      </div>

      {inputMode ? (
        <input
          type='text'
          defaultValue={content}
          className='w-full border border-purple-900 rounded'
          onKeyDown={handleSubmit}
        />
      ) : (
        <div id='comment-content'>{content}</div>
      )}

      <DeleteOrUpdate
        id={id}
        password={password}
        goodsId={goodsId}
        setInputMode={setInputMode}
        inputMode={inputMode}
        refresh={refresh}
        inputRef={inputRef}
      />
    </div>
  );
}

export default Comment;
