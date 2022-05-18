import { useState, useRef } from 'react';

import axios from 'axios';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Grid from '@mui/material/Grid';
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
      <div>
        <div>
          {/* <i className=' icon-etc  w-9 h-9'></i> */}
          {/* <PersonPinIcon style={{ width: '40px', height: '40px' }} />
          <span className='relative bottom-3' style={{ marginTop: 150 }}>
            {nickname}
          </span> */}
          <Grid container>
            <Grid lg={0.5}>
              <PersonPinIcon style={{ width: '40px', height: '40px' }} />
            </Grid>
            <Grid lg={11.5} style={{ marginTop: '20px' }}>
              <strong className='relative bottom-3' style={{ marginTop: 100 }}>
                {nickname}
              </strong>
            </Grid>
          </Grid>
        </div>

        {/* <div>
          <button className='w-16 h-8  bd-df'>
            <i className='icon-box icon-info icon-up w-5 h-5'></i> 0
          </button>
          <button className='w-16 h-8 ml-2 bd-df'>
            <i className='icon-box icon-info icon-down w-5 h-5'></i> 0
          </button>
        </div> */}
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
