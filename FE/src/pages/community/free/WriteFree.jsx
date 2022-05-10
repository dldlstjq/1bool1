/* eslint-disable no-unused-vars */
import { useState } from "react";
import { BASE_URL } from "../../..";

import axios from "axios";

import { useNavigate } from "react-router-dom";

export default function WriteFree() {
  const navigate = useNavigate();

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
          required
        />

        <input
          type="text"
          placeholder="닉네임"
          name="nickname"
          className="h-16 border border-slate-300"
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          name="password"
          className="h-16 border border-slate-300"
          required
        />
        <textarea
          cols="30"
          rows="10"
          className="border border-slate-300 col-span-2"
          name="content"
          placeholder="내용"
          required
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
