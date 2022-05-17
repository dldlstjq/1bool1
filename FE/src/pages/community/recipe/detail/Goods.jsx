/* eslint-disable no-unused-vars */
import { GroupAddSharp } from '@mui/icons-material';
import './RecipeDetail.css';

function Goods({ goods }) {
  console.log(goods);
  return (
    <>
      <p id='ingredients' className='text-xl'>
        재료
      </p>
      <div className='grid grid-cols-3'>
        {goods.map(({ goods_photo, name }, i) => (
          <div>
            <img id='ingredientImg' src={goods_photo} key={i} alt='' />
            <p id='ingredientName'>{name}</p>
          </div>

          // <p key={i}>{name}</p>
        ))}
      </div>
    </>
  );
}

export default Goods;
