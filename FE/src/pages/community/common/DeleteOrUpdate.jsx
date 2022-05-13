/* eslint-disable no-unused-vars */
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function DeleteOrUpdate({
  setPassword,
  password,
  inputPassword,
  afterUrl,
  state,
  updatePageUrl,
  url,
  params,
}) {
  const navi = useNavigate();

  function handleDelete() {
    if (inputPassword === password) {
      axios({
        method: "delete",
        url,
        params,
      })
        .then(setTimeout(() => navi(afterUrl), 1000))
        .catch((err) => console.log(err));
      return;
    }
    alert("비밀번호가 다릅니다");
  }

  function toUpdatePage() {
    if (inputPassword === password) {
      navi(updatePageUrl, { state });
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
        onChange={(e) => setPassword(e.target.value)}
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
