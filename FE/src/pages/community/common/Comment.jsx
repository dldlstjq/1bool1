import { useState } from "react";
import { DeleteOrUpdate } from "./DeleteOrUpdate";

/* eslint-disable no-unused-vars */
function Comment(props) {
  const { content, nickname, password, id, boardId } = props;
  const [commentPw, setCommentPw] = useState("");

  return (
    <div className="p-1 border border-stone-300">
      <div className="flex justify-between">
        <div>
          <i className="icon-box icon-etc icon-user w-9 h-9"></i>{" "}
          <span className="relative bottom-3">{nickname}</span>
        </div>

        <div>
          <button className="w-16 h-8  bd-df">
            <i className="icon-box icon-info icon-up w-5 h-5"></i> 0
          </button>
          <button className="w-16 h-8 ml-2 bd-df">
            <i className="icon-box icon-info icon-down w-5 h-5"></i> 0
          </button>
        </div>
      </div>
      <div id="comment-content">{content}</div>
      <DeleteOrUpdate
        setPw={setCommentPw}
        inputPw={commentPw}
        url={"comment/" + boardId}
        id={id}
        pw={password}
      />
    </div>
  );
}

export default Comment;
