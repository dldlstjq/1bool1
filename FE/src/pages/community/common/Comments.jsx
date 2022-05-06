/* eslint-disable no-unused-vars */
import Comment from "./Comment";
import axios from "axios";

import { BASE_URL } from "../../..";

function Comments({ comments }) {
  function handleClick({ target }) {
    axios({
      method: "post",
      url: BASE_URL + "",
    });
  }
  return (
    <>
      <div className="p-5 bg-stone-200 border border-stone-300 text-right">
        <textarea
          name="comment-input"
          id=""
          className="w-full h-24 focus:outline-none border border-stone-300"
          placeholder="댓글을 작성해주세요"
        ></textarea>
        <button
          className="bg-gray-700 w-20 h-10 text-white"
          onClick={handleClick}
        >
          등록
        </button>
      </div>
      {comments.map(({ content, nickname, password, id, boardId }, idx) => (
        <Comment
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

export default Comments;
