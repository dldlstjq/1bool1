/* eslint-disable no-unused-vars */
import { GroupAddSharp } from '@mui/icons-material';
import './RecipeDetail.css';

function Goods({ goods }) {
  return (
    <>
      <p id='ingredients' className='text-xl'>
        재료
      </p>
      <div className='grid grid-cols-2 md:grid-cols-3'>
        {goods.map(({ goods_photo, name }, i) => (
          <div>
            <img
              id='ingredientImg'
              className='main-photo h-[200px] md:h-[400px] lg:h-[400px] w-3/4 mx-auto'
              src={goods_photo}
              key={i}
              alt=''
            />
            <p id='ingredientName'>{name}</p>
          </div>


        ))}
      </div>
    </>
  );
}

export default Goods;
