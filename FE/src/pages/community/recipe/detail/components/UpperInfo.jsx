/* eslint-disable no-unused-vars */

import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import '../RecipeDetail.css';

function UpperInfo({ photo, star, title, minute, modifiedDate, nickname, description }) {
  return (
    <>
      <img src={photo} alt='' className='main-photo w-3/4 mx-auto' />
      {/* <div className='flex justify-between mb-3' style={{ marginTop: '10px' }}> */}
      {/* <div style={{ textAlign: 'center' }}> */}
      {/* <h1>
            <span className='text-lg font-bold text-purple-900'>{nickname} </span>
            님의
          </h1> */}
      <p id='recipeTitle'> {title}</p>
      {/* </div> */}
      {/* <div id='icons' className='flex justify-end items-center'>
          <img src='/images/bookmark.png' alt='' className='w-6' />
          <img src='/images/share.png' alt='' className='w-8' />
        </div> */}
      {/* </div> */}
      {/* <div className='inline-block w-1/2'>
        난이도
        {[...Array(star)].map((e, i) => (
          <img src='/images/star.png' alt='' key={i} className='w-5 inline-block' />
        ))}
      </div> */}
      {/* <h1 className='text-xl'> 이 요리는...</h1> */}
      <p id='recipeDescription'> {description}</p>
      <div class='place-content-center' style={{ display: 'flex' }}>
        <div>
          <AccessAlarmIcon id='clock' />
        </div>
      </div>

      <p id='timeContent'>{minute}분 소요</p>
      {/* 소요시간 : {minute}분<p> 수정일자 {modifiedDate?.split('.')[0]}</p> */}
    </>
  );
}

export default UpperInfo;
