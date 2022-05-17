/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { BASE_URL } from "../../..";

import axios from "axios";

import { useNavigate, useLocation } from "react-router-dom";

// 수정을 위해 useEffect 사용하여 데이타를 가져와 state에 저장 -> input들에 반영.
// useEffect 내에서 조건문으로 수정이면 요청, 처음이면 리턴

export default function WriteFree() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
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

  let fileObj = [];
  let fileArray = [];

  function uploadMultipleFiles(e) {
    fileObj.push(e.target.files);
    for (let i = 0; i < fileObj[0].length; i++) {
      fileArray.push(URL.createObjectURL(fileObj[0][i]));
    }
    setFiles(fileArray);
  }

  return (
    <form
      action={BASE_URL + "board"}
      method="post"
      encType="multipart/form-data"
      onSubmit={submit}
      className="p-4 md:p-32 lg:p-48 flex flex-col gap-2"
    >
      <div className="h-28" style={{ backgroundColor: "#fafbfc" }}>
        <img src="/images/chat.png" alt="" className="mt-4 ml-2 inline-block" />
        <span className="inline-block ml-4 text-slate-500">
          자유롭게 정보를 공유해보세요
        </span>
      </div>
      * 제목
      <input
        type="text"
        className="h-14 border border-grey-100 pl-4 mb-6"
        placeholder="제목을 입력해주세요"
        name="title"
        defaultValue={title}
        required
      />
      * 닉네임
      <input
        type="text"
        placeholder="닉네임을 입력해주세요"
        name="nickname"
        className="h-14 border border-grey-100  pl-4 mb-6"
        required
        defaultValue={nickname}
      />
      * 비밀번호
      <input
        type="password"
        placeholder="비밀번호"
        name="password"
        className="h-14 border border-grey-100  pl-4 mb-6"
        required
        defaultValue={password}
      />
      * 내용
      <textarea
        className="h-40 border border-grey-100  pl-4 mb-6"
        name="content"
        placeholder="내용을 입력해주세요"
        required
        defaultValue={content}
      ></textarea>
      <input
        type="file"
        accept="image/*"
        name="file"
        className="hidden"
        multiple
        ref={fileInputRef}
        onChange={uploadMultipleFiles}
      />
      {files.length > 0 && (
        <div className="flex justify-between my-10 flex-wrap">
          {files.map((url, idx) => (
            <img
              src={url}
              alt=""
              key={idx}
              className="md:max-w-sm max-w-[40%]"
            />
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <button
          onClick={(e) => {
            e.preventDefault();
            fileInputRef.current.click();
          }}
          className="h-12 bg-slate-600 text-white grow"
        >
          사진추가
        </button>
        <button
          className="h-12 bg-slate-600 text-white grow"
          onClick={(e) => {
            e.preventDefault();
            navigate("/community");
          }}
        >
          돌아가기
        </button>
        <button className="h-12 bg-blue-600 text-white grow" type="submit">
          작성완료
        </button>
      </div>
    </form>
  );
}
