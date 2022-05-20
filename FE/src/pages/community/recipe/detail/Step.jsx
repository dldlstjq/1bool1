/* eslint-disable no-unused-vars */
import { Grid } from '@mui/material';
import './RecipeDetail.css';

function Step({ step, img, i }) {
  return (
    <div className='py-2 my-2 border-t-4 '>
      <br />
      <span id='step' className='text-xl' style={{ marginTop: '10px' }}>
        STEP {i}
      </span>
      <Grid container spacing={1} sx={{ mx: '25' }} style={{ justifyContent: 'center' }}>

        <Grid xs={6} md={6}>
    

          <p id='description'>{step}</p>
        </Grid>
        <Grid xs={6} md={4}>
          <img src={img} alt='' className='w-3/4 mx-auto' />
        </Grid>
      </Grid>

    </div>
  );
}

export default Step;
