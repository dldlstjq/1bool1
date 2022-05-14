import { useState, useRef } from "react";

import axios from "axios";
import classNames from "classnames";

import { DeleteOrUpdate } from "./DeleteOrUpdate";

/* eslint-disable no-unused-vars */
function Comment({
  content,
  nickname,
  password,
  id,
  boardId,
  recipeId,
  refresh,
}) {
  const [inputMode, setInputMode] = useState(false);
  const data = { id, nickname, password };
  const inputRef = useRef();
  let url = "comment/" + boardId;
  if (recipeId) {
    url = "recipereview/" + recipeId;
    data["recipeId"] = recipeId;
  } else {
    data["boardId"] = boardId;
  }
  function handleSubmit(e) {
    if (e.key === "Enter") {
      axios({
        method: "put",
        url,
        data: { ...data, content: e.target.value },
      })
        .then(() => {
          setInputMode(false);
          refresh((prev) => (prev += 1));
        })
        .catch((err) => console.log(err));
    }
  }
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

      {!inputMode && <div id="comment-content">{content}</div>}
      <input
        type="text"
        defaultValue={content}
        onKeyDown={handleSubmit}
        ref={inputRef}
        className={classNames(
          "w-full",
          "rounded",
          inputMode && "border",
          inputMode && "border-purple-900",
          inputMode && "h-10",
          !inputMode && "h-0"
        )}
      />

      <DeleteOrUpdate
        id={id}
        password={password}
        setInputMode={setInputMode}
        inputMode={inputMode}
        refresh={refresh}
        boardId={boardId}
        recipeId={recipeId}
        inputRef={inputRef}
      />
    </div>
  );
}

export default Comment;
