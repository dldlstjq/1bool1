/* eslint-disable no-unused-vars */

import { useParams, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useFetchItem, useFetchAndUpdate } from "../common/hooks";

import classNames from "classnames";

import Popover from "../common/Popover";
import Comments from "../common/comment/Comments";
import UpperInfo from "./components/UpperInfo";
import UserInfoBox from "./UserInfoBox";
import { DeleteOrUpdate } from "./DeleteOrUpdate";
import LikeButton from "../common/LikeButton";

function Detail() {
  const { articleId } = useParams();
  const [popover, setpopover] = useState(false);
  const [showcomments, setShowcomments] = useState(true);
  const [foo, refresh] = useState(0);
  const [articlePw, setarticlePw] = useState("");

  const coordRef = useRef([0, 0]);
  const navi = useNavigate();

  const [articleData] = useFetchItem(`board/${articleId}`, []);
  const comments = useFetchAndUpdate(`comment/${articleId}`, foo, []);

  const { title, content, modifiedDate, id, nickname, password, photo } =
    articleData;

  const user_id = localStorage.getItem("user_id");

  return (
    <div onWheel={() => setpopover(false)}>
      <UpperInfo nickname={nickname} title={title} />
      <div className="relative mt-1">
        <i className="icon-box icon-sns w-20 h-6 absolute right-0"></i>
      </div>
      <div className="content-box">
        <div className="grey">
          최근 수정 일시 : {modifiedDate?.split(".")[0]}{" "}
        </div>
        <p style={{ margin: "1.8rem 0" }}>{content}</p>
        {photo?.split(",").map((url, idx) => (
          <img src={url} alt="" key={idx} />
        ))}

        {user_id && <LikeButton url={"board/like/" + id} user_id={user_id} />}
        <UserInfoBox nickname={nickname} />
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
        className="bg-gray-700 text-white h-10 w-1/3 mt-5"
        onClick={() => navi("/community")}
      >
        목록보기
      </button>

      {popover && (
        <Popover x={coordRef.current[0]} y={coordRef.current[1]}>
          <h6>ㅇㅇ</h6>
        </Popover>
      )}
    </div>
  );
}

export default Detail;
