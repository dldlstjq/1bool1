/* eslint-disable no-unused-vars */
import { useState, useRef } from 'react';

import axios from 'axios';
import classNames from 'classnames';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import Grid from '@mui/material/Grid';
import { DeleteOrUpdate } from './DeleteOrUpdate';
import { Container, Typography, Box, Button, TextField} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


/* eslint-disable no-unused-vars */
function Comment({ content, nickname, password, id, boardId, recipeId, refresh }) {
  const [inputMode, setInputMode] = useState(false);
  const data = { id, nickname, password };
  const inputRef = useRef();
  let url = 'comment/' + boardId;
  if (recipeId) {
    url = 'recipereview/' + recipeId;
    data['recipeId'] = recipeId;
  } else {
    data['boardId'] = boardId;
  }
  function handleSubmit(e) {
    if (e.key === 'Enter') {
      axios({
        method: 'put',
        url,
        data: { ...data, content: e.target.value },
      })
        .then(() => {
          setInputMode(false);
          refresh((prev) => (prev += 1));
        })
        .catch((err) => console.log(err));
    }
  }
  return (
    // <div className='p-1 border border-stone-300'>
    <Box sx={{ borderBottom:1, borderTop:1, borderColor:'grey.500', padding:'0.5rem'}}>
      <div >
        <Box sx={{paddingTop:1}}>
          {/* <i className='icon-box icon-etc icon-user w-9 h-9'></i>{' '}
          <span className='relative bottom-3'>{nickname}</span> */}
          {/* <Grid container>
            <Grid lg={0.5}>
              <PersonPinIcon style={{ width: '40px', height: '40px' }} />
            </Grid>
            <Grid lg={11.5} style={{ marginTop: '20px' }}>
              <strong className='relative bottom-3' style={{ marginTop: 100 }}>
                {nickname}
              </strong>
            </Grid>
          </Grid> */}
          {/* <AccountCircleIcon style={{marginRight:3, color:'#F93D59'}}/>{nickname} */}
          <Typography> <AccountCircleIcon style={{marginRight:3, color:'#F93D59'}}/>{nickname} </Typography>
        </Box>

        {/* <div>
          <button className="w-16 h-8  bd-df">
            <i className="icon-box icon-info icon-up w-5 h-5"></i> 0
          </button>
          <button className="w-16 h-8 ml-2 bd-df">
            <i className="icon-box icon-info icon-down w-5 h-5"></i> 0
          </button>
        </div> */}
      </div>
      <Box sx={{paddingLeft:1, paddingTop:1}}>
      {!inputMode && <div id='comment-content'>{content}</div>}
      <input
        type='text'
        defaultValue={content}
        onKeyDown={handleSubmit}
        ref={inputRef}
        className={classNames(
          'w-full',
          'rounded',
          inputMode && 'border',
          inputMode && 'border-purple-900',
          inputMode && 'h-10',
          !inputMode && 'h-0'
        )}
      />
      </Box>
    <Box style={{display:'flex', justifyContent:'end'}}>
      <DeleteOrUpdate
        id={id}
        password={password}
        setInputMode={setInputMode}
        inputMode={inputMode}
        refresh={refresh}
        boardId={boardId}
        recipeId={recipeId}
        inputRef={inputRef}
      />

    </Box>
    </Box>
  );
}

export default Comment;
