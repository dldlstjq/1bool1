/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function DeleteOrUpdate({
  password,
  id,
  refresh,
  setInputMode,
  inputMode,
  boardId,
  recipeId,
  inputRef,
}) {
  const [inputPw, setInputPw] = useState("");
  let url = "comment/" + boardId;
  if (recipeId) url = "recipereview/" + recipeId;
  function handleDelete() {
    if (inputPw === password) {
      axios({
        method: "delete",
        url,
        params: { id, password },
      })
        .then(setTimeout(() => refresh((prev) => (prev += 1)), 1000))
        .catch((err) => console.log(err));
      return;
    }
    alert("비밀번호가 다릅니다");
  }

  function readyUpdate(e) {
    if (inputMode === true) {
      setInputMode(false);
      return;
    } else if (inputPw === password) {
      setInputMode(() => true);
      inputRef.current.focus();
      // setTimeout(() => inputRef.current.focus(), 800);
      return;
    }
    alert("비밀번호가 다릅니다");
  }

  return (
    <div className="grid grid-cols-3 gap-2 my-4">
      <input
        type="password"
        className="bg-gray-700 text-white h-10"
        placeholder="비밀번호"
        name="password"
        onChange={(e) => setInputPw(e.target.value)}
      />
      <button
        id="delete"
        className="bg-gray-700 text-white h-10"
        onClick={handleDelete}
      >
        삭제
      </button>
      <button
        id="update"
        className="bg-gray-700 text-white h-10"
        onClick={readyUpdate}
      >
        {inputMode ? "수정취소" : "수정"}
      </button>
    </div>
  );
}
