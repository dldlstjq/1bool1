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
    <div className="p-1 border border-red-400">
      <div className="mb-2">
        <i className="icon-box icon-etc icon-user w-9 h-9"></i>{" "}
        <span className="text-xl text-red-500">{nickname}</span>
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
