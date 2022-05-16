/* eslint-disable no-unused-vars */
import { useRef } from "react";
import { BASE_URL } from "../../..";

import axios from "axios";

import { useNavigate, useLocation } from "react-router-dom";
import { useFetchIfUpdate, useInputs } from "../common/hooks";

// 수정을 위해 useEffect 사용하여 데이타를 가져와 state에 저장 -> input들에 반영.
// useEffect 내에서 조건문으로 수정이면 요청, 처음이면 리턴

export default function WriteFree() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const fileInputRef = useRef();
  let id = "",
    nickname = "",
    password = "",
    title = "",
    content = "";
  if (state) ({ id, nickname, password, title, content } = state);

  function submit(e) {
    // put or post
    e.preventDefault();
    const data = new FormData(e.target);
    let method = "post";
    if (state) {
      data.append("id", id);
      method = "put";
    }
    axios({
      method,
      url: "board",
      data,
    })
      .then(setTimeout(() => navigate("/community"), 1000))
      .catch((err) => console.log(err));
  }

  function handleChange(e) {}
  return (
    <form
      action={BASE_URL + "board"}
      method="post"
      encType="multipart/form-data"
      onSubmit={submit}
      className="p-10 md:p-24 lg:p-40 flex flex-col"
    >
      <input
        type="text"
        className="h-10 border-b border-blue-500 focus:outline-none"
        placeholder="제목을 입력해주세요"
        name="title"
        defaultValue={title}
        required
      />

      <input
        type="text"
        placeholder="닉네임"
        name="nickname"
        className="h-10 border-b border-blue-500 focus:outline-none"
        required
        defaultValue={nickname}
      />
      <input
        type="password"
        placeholder="비밀번호"
        name="password"
        className="h-10 border-b border-blue-500 focus:outline-none"
        required
        defaultValue={password}
      />
      <textarea
        className="h-30 bg-blue-100 focus:outline-none p-2"
        name="content"
        placeholder="내용"
        required
        defaultValue={content}
      ></textarea>
      <input
        type="file"
        accept="image/png, image/jpeg"
        name="file"
        className="hidden"
        ref={fileInputRef}
      />
      <div className="flex justify-between">
        <button
          onClick={(e) => {
            e.preventDefault();
            fileInputRef.current.click();
          }}
          className="h-8 text-blue-500 text-lg font-black border-2 border-blue-500 w-1/3 "
        >
          사진추가
        </button>
        <button
          className="h-8 bg-blue-700 w-1/3 inline-block text-white"
          onClick={(e) => {
            e.preventDefault();
            navigate("/community");
          }}
        >
          돌아가기
        </button>
      </div>
      <button
        className="h-8 w-1/3 text-white bg-blue-500 mx-auto"
        type="submit"
      >
        작성완료
      </button>
    </form>
  );
}
