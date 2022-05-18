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
    <Box sx={{ borderBottom:1, borderTop:1, borderColor:'grey.500', padding:'0.5rem'}}>
      <div >
        <Box sx={{paddingTop:1}}>
          <Typography> <AccountCircleIcon style={{marginRight:3, color:'#F93D59'}}/>{nickname} </Typography>
        </Box>
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
