/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { BASE_URL } from "../../..";

import axios from "axios";

import { useNavigate, useLocation } from "react-router-dom";
import { useFetchIfUpdate, useInputs } from "../common/hooks";

// 수정을 위해 useEffect 사용하여 데이타를 가져와 state에 저장 -> input들에 반영.
// useEffect 내에서 조건문으로 수정이면 요청, 처음이면 리턴

export default function WriteFree() {
  const navigate = useNavigate();

  const [init, setInit] = useInputs({
    id: "",
    nickname: "",
    password: "",
    title: "",
    content: "",
  });

  const { state } = useLocation();
  useEffect(() => {
    if (state) {
      setInit(state);
    }
  }, [setInit, state]);

  async function submit(e) {
    // put or post
    e.preventDefault();
    const data = new FormData(e.target);

    if (state) data.append("id", init.id);
    axios({
      method: "put",
      url: "board",
      data,
    })
      .then(setTimeout(() => navigate("/community/free"), 1000))
      .catch((err) => console.log(err));
  }

  function handleChange(e) {}
  return (
    <div className="grid grid-cols-2 gap-4">
      <select className="nav-controller select col-span-2 h-16">
        <option value="">자유 게시판</option>
      </select>
      <form
        action={BASE_URL + "board"}
        method="post"
        encType="multipart/form-data"
        onSubmit={submit}
        className="col-span-2 grid grid-cols-2 gap-2 "
      >
        <input
          type="text"
          className="h-16 border border-slate-300 px-4 col-span-2"
          placeholder="제목을 입력해주세요"
          name="title"
          value={init.title}
          required
          onChange={setInit}
        />

        <input
          type="text"
          placeholder="닉네임"
          name="nickname"
          className="h-16 border border-slate-300"
          required
          value={init.nickname}
          onChange={setInit}
        />
        <input
          type="password"
          placeholder="비밀번호"
          name="password"
          className="h-16 border border-slate-300"
          required
          value={init.password}
          onChange={setInit}
        />
        <textarea
          cols="30"
          rows="10"
          className="border border-slate-300 col-span-2"
          name="content"
          placeholder="내용"
          required
          value={init.content}
          onChange={setInit}
        ></textarea>
        <input
          type="file"
          accept="image/png, image/jpeg"
          name="file"
          className="col-span-2"
        />

        <button
          className="w-32 h-12 bg-32 text-white col-span-2 mx-auto"
          type="submit"
        >
          작성완료
        </button>
      </form>
    </div>
  );
}
