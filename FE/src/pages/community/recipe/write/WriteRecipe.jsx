/* eslint-disable no-unused-vars */
import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Grid, Typography, Box, Button, TextField } from '@mui/material';
// import { useInputs } from "../../common/hooks";
import Appbar from '../../../../components/main/Appbar';
import Footer from '../../../../components/main/Footer';

import axios from 'axios';

import Upper from './Upper';
import Steps from './Steps';
import IngredientSelect from './IngredientSelect';

function WriteRecipe() {
  const [dialog, setDialog] = useState(false);
  const [selected, setSelected] = useState([]);
  const navi = useNavigate();
  const { state } = useLocation();
  let content = '',
    description = '',
    minute = '',
    nickname = '',
    password = '',
    star = '',
    title = '';
  if (state) ({ content, description, minute, nickname, password, star, title } = state);

  const handleCancel = useCallback(() => {
    navi('/community/recipe');
  }, [navi]);

  function handleSubmit(e) {
    // put or post
    e.preventDefault();
    if (selected.length === 0) {
      alert('재료를 추가해주세요');
      return;
    }
    const form = new FormData(e.target);
    form.delete('conv');
    const content = [];
    for (const step of form) {
      if (step[0] === 'step') content.push(step[1]);
    }
    form.append('content', JSON.stringify(content));
    form.delete('step');
    form.append('goodsId', selected.map(({ goodsId }) => goodsId).join(','));
    if (state) {
      form.append('id', state.id);
      axios({
        method: 'put',
        url: 'recipe',
        data: form,
      })
        .then(setTimeout(() => navi('/community/recipe'), 1000))
        .catch((err) => console.log(err));
    } else {
      axios({
        method: 'post',
        url: 'recipe',
        data: form,
      })
        .then(setTimeout(() => navi('/community/recipe'), 1000))
        .catch((err) => console.log(err));
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <Appbar />
      <div style={{ flex: '1', marginTop: 30 }}>
        <Container>
          <form onSubmit={handleSubmit}>
            {/* <Grid container spacing={2} >
        <Grid item xs={2}></Grid>
        <Grid item xs={8} > */}

            <Upper
              nickname={nickname}
              password={password}
              description={description}
              minute={minute}
              star={star}
              title={title}
            />

            <IngredientSelect selected={selected} setSelected={setSelected} />
            <Steps content={content} />
            <div className='flex gap-2 mt-5 place-content-center'>
              <button className='h-10  bg-lime-500/75 rounded text-white w-1/3' type='submit'>
                작성완료
              </button>
              <button
                className='h-10  bg-red-500/75 rounded text-white w-1/3'
                onClick={handleCancel}
              >
                취소
              </button>
            </div>
            {/* </Grid>
        <Grid item xs={2}></Grid>
      </Grid> */}
          </form>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default WriteRecipe;
