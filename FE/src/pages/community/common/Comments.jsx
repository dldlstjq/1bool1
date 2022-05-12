/* eslint-disable no-unused-vars */
import React from "react";

import Comment from "./Comment";

const Comments = React.forwardRef(
  ({ comments, handleCommentSubmit, boardId }, ref) => {
    return (
      <>
        <form
          className="p-3 bg-stone-200 border border-stone-300 grid grid-cols-2 gap-2"
          onSubmit={handleCommentSubmit}
        >
          <input
            type="text"
            name="nickname"
            className="h-10"
            placeholder="닉네임"
            required
            ref={ref}
          />
          <input
            type="password"
            className="h-10"
            placeholder="비밀번호"
            required
            name="password"
          />

          <textarea
            name="content"
            id=""
            className="h-24 focus:outline-none border border-stone-300 col-span-2"
            placeholder="댓글을 작성해주세요"
            required
          ></textarea>
          <button
            className="bg-gray-700 w-20 h-10 text-white col-span-2 ml-auto"
            type="submit"
          >
            등록
          </button>
        </form>
        {comments?.map(({ content, nickname, password, id, boardId }, idx) => (
          <Comment
            key={idx}
            content={content}
            nickname={nickname}
            password={password}
            id={id}
            boardId={boardId}
          />
        ))}
      </>
    );
  }
);

export default Comments;
