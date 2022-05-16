/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function DeleteOrUpdate({
  password,
  afterUrl,
  state,
  updatePageUrl,
  url,
  params,
  refresh,
}) {
  const [inputPw, setInputPw] = useState("");
  const navi = useNavigate();

  function handleDelete() {
    if (inputPw === password) {
      axios({
        method: "delete",
        url,
        params,
      })
        .then(() => {
          if (afterUrl) setTimeout(() => navi(afterUrl), 1000);
          else {
            setTimeout(() => refresh((prev) => (prev += 1)), 1000);
          }
        })
        .catch((err) => console.log(err));
      return;
    }
    alert("비밀번호가 다릅니다");
  }

  function toUpdatePage() {
    if (inputPw === password) {
      navi(updatePageUrl, { state });
      return;
    }
    alert("비밀번호가 다릅니다");
  }

  return (
    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2 mt-4">
      <input
        type="password"
        className="h-7 rounded"
        placeholder="비밀번호"
        name="articlePw"
        onChange={(e) => setInputPw(e.target.value)}
      />
      <button
        id="delete"
        className="bg-red-500 text-white h-7 rounded"
        onClick={handleDelete}
      >
        삭제
      </button>
      <button
        id="update"
        className="bg-red-400 h-7 rounded text-white"
        onClick={toUpdatePage}
      >
        수정
      </button>
    </div>
  );
}
