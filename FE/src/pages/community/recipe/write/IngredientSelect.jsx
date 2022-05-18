/* eslint-disable no-unused-vars */
import { height } from '@mui/system';
import { useState } from 'react';
import { Container, Grid, Typography, Box, Button, TextField, Hidden } from '@mui/material';
import { useFetchList } from '../../common/hooks';
import CardMedia from '@mui/material/CardMedia';

function IngredientSelect({ selected, setSelected }) {
  const convList = ['cs', 'cu', 'em', 'gs', 'ms', 'se'];
  const [conv, setConv] = useState('CS');
  const [sum, setSum] = useState(0);
  const ingredients = useFetchList('goods/convinence?con=' + conv);
  var sum_price = 0;

  function handleInputChange(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      for (let el of ingredients) {
        if (el.name === e.target.value) {
          sum_price = sum_price + el.price;
          setSum(sum + el.price);
          setSelected([
            ...selected,
            {
              name: el.name,
              goodsId: el.id,
              img_link: el.photoPath,
              goodsPrice: el.price,
              sum_price,
            },
          ]);
          e.target.value = '';
          break;
        }
      }
    }
  }
  function removeFromList({ target }) {
    if (target.matches('span')) {
      console.log(target.id);
      const newSelected = selected.filter((el) => el.goodsId !== parseInt(target.id));
      console.log(newSelected);
      setSelected(newSelected);
      // setSelected(selected.filter((el) => el.goodsId !== parseInt(target.id)));

      let total = 0;
      newSelected.forEach((item) => (total += item.goodsPrice));
      setSum(total);
      // console.log(target.p);
      // console.log(target.price);

      // setSum(sum - parseInt(target.price));
    }
  }

  return (
    <div className='p-4 rounded my-1' style={{ backgroundColor: '#ffe5e4' }}>
      <h1 className='text-lg font-bold'>재료</h1>

      <select name='conv' onChange={(e) => setConv(e.target.value)} className=' h-10 rounded-l'>
        {convList.map((conv, idx) => (
          <option value={conv} key={idx}>
            {conv}
          </option>
        ))}
      </select>
      <input
        type='search'
        list='item-list'
        onKeyDown={handleInputChange}
        className=' h-10 w-2/5 rounded-r ml-px '
      />

      <div>
        <Grid container spacing={1} style={{ marginTop: '20px' }}>
          <Grid xs={2} md={2} lg={2}>
            <h1 className='text-lg font-bold'>가격</h1>
          </Grid>
          <Grid xs={10} md={2} lg={2}>
            <p className='text-lg font-bold'>{sum}원</p>
          </Grid>
        </Grid>
      </div>

      <datalist id='item-list'>
        {ingredients?.map(({ name }, idx) => (
          <option value={name} key={idx} />
        ))}
      </datalist>
      <div className='grid grid-cols-3 auto-rows-max' onClick={removeFromList}>
        {selected.map(({ name, goodsId, img_link, goodsPrice, sum_price }, idx) => (
          <Box sx={{ width: '100%', height: '80%', marginTop: '1rem', maxHeight: '300px' }}>
            <span className='text-lg font-bold' key={idx} id={goodsId} price={goodsPrice}>
              {name}
              <CardMedia
                component='img'
                alt='이미지 준비중'
                sx={{ width: '80%', height: '80%' }}
                image={img_link}
                style={{ mx: 2 }}
              />
              <p>{goodsPrice} 원</p>
            </span>
            {/* <p>{sum_price}</p> */}
          </Box>
        ))}
      </div>
    </div>
  );
}

export default IngredientSelect;
