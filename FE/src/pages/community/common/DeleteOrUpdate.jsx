/* eslint-disable no-unused-vars */
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { axiosRequest } from "./functions";

export function DeleteOrUpdate({
  setPw,
  pw,
  inputPw,
  afterUrl,
  state,
  id,
  updatePageUrl,
}) {
  const navi = useNavigate();

  function handleDelete() {
    if (inputPw === pw) {
      axiosRequest(`board/${id}`, "delete", { pw }, null);
      setTimeout(() => navi(afterUrl), 1000);
      return;
    }
    alert("비밀번호가 다릅니다");
  }

  function toUpdatePage() {
    if (inputPw === pw) {
      navi(updatePageUrl, { state });
      return;
    }
    alert("비밀번호가 다릅니다");
  }

  function handleUpdate() {
    if (inputPw === pw) {
      axiosRequest(`board`);
      navi(afterUrl, { state });
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
        name="articlePw"
        onChange={(e) => setPw(e.target.value)}
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
        onClick={toUpdatePage}
      >
        수정
      </button>
    </div>
  );
}
