/* eslint-disable no-unused-vars */

import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import { useFetchItem, useFetchAndUpdate } from "../common/hooks";

import Comments from "../common/comment/Comments";
import UserInfoBox from "./UserInfoBox";
import { DeleteOrUpdate } from "./DeleteOrUpdate";
import LikeButton from "../common/LikeButton";

function Detail() {
  const [inputPw, setInputPw] = useState("");

  const navi = useNavigate();
  const state = useLocation().state;
  // const [articleData] = useFetchItem(`board/${articleId}`, []);

  const { title, content, modifiedDate, id, nickname, password, photo } = state;

  const user_id = localStorage.getItem("user_id");

  return (
    <div className="p-4">
      <h1 className="text-3xl bg-red-500 text-white pl-2 rounded-t">{title}</h1>
      <div className="p-2 border border-red-500">
        <h1>By {nickname}</h1>
        <p className="mb-2">수정시각 {modifiedDate?.split(".")[0]} </p>
        <p>{content}</p>
        {photo?.split(",").map((url, idx) => (
          <img src={url} alt="" key={idx} />
        ))}

        {user_id && id && (
          <LikeButton url={"board/like/" + id} user_id={user_id} />
        )}
        {/* <UserInfoBox nickname={nickname} /> */}
        <DeleteOrUpdate
          setPassword={setInputPw}
          inputPassword={inputPw}
          password={password}
          url={"board/" + id}
          afterUrl="/community"
          updatePageUrl="/community/write"
          // state={articleData}
          params={{ password }}
        />
      </div>
      <Comments which="board" id={id} />

      <button
        className="border-2 border-red-600 h-7 px-2 mt-5"
        onClick={() => navi("/community")}
      >
        목록보기
      </button>
    </div>
  );
}

export default Detail;
