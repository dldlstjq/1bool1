import React from 'react';

/* eslint-disable no-unused-vars */
const Upper = ({ comments, showComments, handleClick }) => {
  return (
    // <div onClick={handleClick} className='bg-red-500 text-white pl-1'>
    //   댓글 {comments.length}
    // </div>
    <div className='flex justify-between' onClick={handleClick}>
      <span id='show-comments' className='cursor-pointer'>
        댓글 {comments.length}
      </span>
    </div>
  );
};

export default Upper;
