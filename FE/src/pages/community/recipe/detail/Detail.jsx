/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';

import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Container, Grid, Typography, Box, Button, TextField } from '@mui/material';

import { BASE_URL } from '../../../../index';
import { useFetchList } from '../../common/hooks';

import Step from './Step';
import Goods from './Goods';
import { DeleteOrUpdate } from './DeleteOrUpdate';
import Comments from '../../common/comment/Comments';
import UpperInfo from './components/UpperInfo';

import Appbar from '../../../../components/main/Appbar';
import Footer from '../../../../components/main/Footer';

function Detail() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({});
  const [inputPassword, setInputPassword] = useState('');
  const [likeCnt, setLikeCnt] = useState(0);

  const {
    photo,
    title,
    nickname,
    password,
    modifiedDate,
    content,
    star,
    minute,
    description,
    price,
  } = recipe;

  const steps = content && JSON.parse(content);
  const photos = photo?.split(',');
  const navi = useNavigate();
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    axios({
      method: 'get',
      url: 'recipe/' + recipeId,
    })
      .then((res) => {
        setRecipe(res.data.object);
      })


    axios({
      method: 'get',
      url: BASE_URL + 'recipe/like/' + recipeId,
    })
      .then((res) => {
        setLikeCnt(res.data.object);
      })

  }, [recipeId]);

  const goods = useFetchList('recipe/goods/' + recipeId);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <Appbar />
      <div style={{ flex: '1', marginTop: 30 }}>
        <Container>
          <div>
            <UpperInfo
              photo={photos && photos[0]}
              minute={minute}
              modifiedDate={modifiedDate}
              nickname={nickname}
              star={star}
              title={title}
              description={description}
              recipeId={recipeId}
              price={price}
              likeCnt={likeCnt}
            />

            <hr id='line'></hr>
            <Goods goods={goods} />
            {steps?.map((step, idx) => (
              <Step key={idx} step={step} img={photos[idx + 1]} i={idx + 1} />
            ))}

            <hr id='line' style={{ marginTop: '1rem' }}></hr>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'end',
                marginTop: '1rem',
                marginBottom: '1rem',
              }}
            >
              <DeleteOrUpdate
                setPassword={setInputPassword}
                inputPassword={inputPassword}
                afterUrl='/recipe'
                params={{ nickname, password }}
                password={password}
                state={recipe}
                updatePageUrl='/recipe/write'
                url={`recipe/${recipeId}`}
              />
            </Box>
            <Comments which='recipe' detailId={recipeId} />
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                onClick={() => navi('/recipe')}
                style={{
                  backgroundColor: '#F93D59',
                  color: 'white',
                  fontWeight: 'bold',
                  marginTop: '2rem',
                }}
              >
                목록
              </Button>
            </Box>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Detail;
