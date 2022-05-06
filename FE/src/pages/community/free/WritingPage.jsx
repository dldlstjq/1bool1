/* eslint-disable no-unused-vars */
import { useState } from "react";
import { BASE_URL } from "../../..";

import axios from "axios";

import { useNavigate } from "react-router-dom";

export default function WritingPage() {
  const [inputs, setinputs] = useState({});
  const navigate = useNavigate();

  function handleChange({ target }) {
    const { name, value } = target;
    setinputs({ ...inputs, [name]: value });
  }

  function submit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    axios({
      method: "post",
      url: BASE_URL + "board",
      data,
    }).then(navigate("/community/free"));
  }

  return (
    <div className="flex flex-col items-center">
      <select className="nav-controller select w-full h-16">
        <option value="">자유 게시판</option>
      </select>
      <form
        action={BASE_URL + "board"}
        method="post"
        encType="multipart/form-data"
        onSubmit={submit}
      >
        <input
          type="text"
          className="w-full h-16 mt-4 border border-slate-300 px-4 "
          placeholder="제목을 입력해주세요"
          name="title"
          value={inputs.title}
          // onChange={handleChange}
        />
        <textarea
          cols="30"
          rows="10"
          className="w-full mt-4 px-2 border border-slate-300"
          name="content"
          value={inputs.content}
          // onChange={handleChange}
        ></textarea>
        <input type="file" accept="image/png, image/jpeg" name="file" />
        <input type="text" placeholder="닉네임" name="nickname" />
        <input type="text" placeholder="비밀번호" name="password" />

        <button
          className="w-32 h-12 bg-32 m-4 text-white"
          type="submit"
          // onClick={submit}
        >
          작성완료
        </button>
      </form>
    </div>
  );
}
