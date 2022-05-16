/* eslint-disable no-unused-vars */

import { useParams, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useFetchItem, useFetchAndUpdate } from "../common/hooks";

import Comments from "../common/comment/Comments";
import UserInfoBox from "./UserInfoBox";
import { DeleteOrUpdate } from "./DeleteOrUpdate";
import LikeButton from "../common/LikeButton";

function Detail() {
  const { articleId } = useParams();
  const [showcomments, setShowcomments] = useState(true);
  const [foo, refresh] = useState(0);
  const [articlePw, setarticlePw] = useState("");

  const navi = useNavigate();

  const [articleData] = useFetchItem(`board/${articleId}`, []);
  const comments = useFetchAndUpdate(`comment/${articleId}`, foo, []);

  const { title, content, modifiedDate, id, nickname, password, photo } =
    articleData;

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
          setPassword={setarticlePw}
          inputPassword={articlePw}
          password={password}
          url={"board/" + id}
          afterUrl="/community"
          updatePageUrl="/community/free/write"
          state={articleData}
          params={{ password }}
        />
      </div>
      {showcomments && (
        <Comments
          comments={comments}
          articleId={articleId}
          boardId={id}
          url={"/comment/" + id}
          refresh={refresh}
        />
      )}

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
