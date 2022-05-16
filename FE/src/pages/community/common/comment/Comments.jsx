/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";

import axios from "axios";

import Comment from "./Comment";

import Upper from "./Upper";
// import Popover from "../Popover";

const Comments = ({ url, comments, boardId, recipeId, refresh }) => {
  const [showComments, setShowComments] = useState(true);
  const textareaRef = useRef();
  const buttonRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = {};
    for (var a of form.entries()) {
      data[a[0]] = a[1];
    }
    if (boardId) data["boardId"] = boardId;
    if (recipeId) data["recipeId"] = recipeId;
    axios({
      method: "post",
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
      .catch((err) => console.log(err));
  }

  function handleClick(e) {
    const { target, clientX, clientY } = e;
    if (target.matches("#show-comments")) {
      setShowComments((prev) => !prev);
    }
    if (target.matches("#focus")) {
      setShowComments(true);
      setTimeout(() => {
        textareaRef.current.focus();
      }, 500);
    }
  }

  return (
    <div>
      <div className="border border-red-400 my-2">
        <Upper
          comments={comments}
          setShowComments={setShowComments}
          showComments={showComments}
          handleClick={handleClick}
        />
        {showComments && (
          <form className="p-3 flex flex-col" onSubmit={handleSubmit}>
            <input
              type="text"
              name="nickname"
              className="h-8 border-b  border-red-400"
              placeholder="닉네임"
              required
              ref={textareaRef}
            />
            <input
              type="password"
              className="h-8 border-b my-2 border-red-400"
              placeholder="비밀번호"
              required
              name="password"
            />

            <textarea
              name="content"
              id=""
              className="h-24 my-4 border border-red-400"
              placeholder="댓글을 작성해주세요"
              required
              type="text"
            ></textarea>
            <button
              className="bg-red-500 px-4 h-7 text-white w-1/3 mx-auto"
              type="submit"
              ref={buttonRef}
            >
              등록
            </button>
          </form>
        )}
      </div>

      {showComments &&
        comments?.map(
          ({ content, nickname, password, id, boardId, recipeId }, idx) => (
            <Comment
              key={idx}
              content={content}
              nickname={nickname}
              password={password}
              id={id}
              boardId={boardId}
              recipeId={recipeId}
              refresh={refresh}
            />
          )
        )}
    </div>
  );
};

export default Comments;
