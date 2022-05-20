/* eslint-disable no-unused-vars */

import React, { useState, useRef } from 'react';

import axios from 'axios';

import Comment from './GoodsComment';

const Comments = ({ url, comments, goodsId, boardId, recipeId, refresh }) => {
  const [showComments, setShowComments] = useState(true);
  const textareaRef = useRef();
  const buttonRef = useRef();
  const coordRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = {};
    for (var a of form.entries()) {
      data[a[0]] = a[1];
    }
    if (boardId) data['boardId'] = boardId;
    if (recipeId) data['recipeId'] = recipeId;
    if (goodsId) data['goodsId'] = goodsId;
    axios({
      method: 'post',
      url,
      data,
    })
      .then(() => {
        e.target.reset();
        buttonRef.current.disabled = true;
        setTimeout(() => {
          refresh((prev) => (prev += 1));
          buttonRef.current.disabled = false;
        }, 1000);
      })
  }

  return (
    <>
      <form
        className='p-3 bg-stone-200 border border-stone-300 grid grid-cols-2 gap-2'
        onSubmit={handleSubmit}
        style={{ backgroundColor: '#ffe2e180' }}
      >
        <input
          type='text'
          name='nickname'
          className='h-10'
          placeholder='닉네임'
          required
          ref={textareaRef}
        />
        <input type='password' className='h-10' placeholder='비밀번호' required name='password' />

        <textarea
          name='content'
          id=''
          className='h-24 focus:outline-none border border-stone-300 col-span-2'
          placeholder='댓글을 작성해주세요'
          required
          type='text'
        ></textarea>
        <button
          className='bg-gray-700 w-20 h-10 text-white col-span-2 ml-auto'
          type='submit'
          ref={buttonRef}
          style={{
            backgroundColor: '#f93d59',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: 20,
            height: '2rem',
            marginTop: '1rem',
          }}
        >
          등록
        </button>
      </form>
      {comments?.map(({ content, nickname, password, id, goodsId, boardId, recipeId }, idx) => (
        <Comment
          key={idx}
          content={content}
          nickname={nickname}
          password={password}
          id={id}
          boardId={boardId}
          recipeId={recipeId}
          goodsId={goodsId}
          refresh={refresh}
        />
      ))}
    </>
  );
};

export default Comments;
