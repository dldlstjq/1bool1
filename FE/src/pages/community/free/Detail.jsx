/* eslint-disable no-unused-vars */

import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useFetchItem, useFetchListAndUpdate } from "../common/hooks";

import axios from "axios";

import Popover from "../common/Popover";
import Comments from "../common/comment/Comments";
import { DeleteOrUpdate } from "./DeleteOrUpdate";

function Detail() {
  const { articleId } = useParams();
  const [popover, setpopover] = useState(false);
  const [showcomments, setshowcomments] = useState(true);
  const [foo, refresh] = useState(0);
  const [articlePw, setarticlePw] = useState("");

  const coordRef = useRef([0, 0]);
  const textareaRef = useRef();
  const navi = useNavigate();

  const articleData = useFetchItem(`board/${articleId}`);
  const comments = useFetchListAndUpdate(`comment/${articleId}`, [foo]);

  const {
    title,
    content,
    modifiedDate,
    id,
    nickname,
    password,
    photo,
    createdDate,
  } = articleData;

  function handleClick(e) {
    const { target, clientX, clientY } = e;
    if (target.matches("#show-comments")) {
      setshowcomments((prev) => !prev);
    }
    if (target.matches("#report")) {
      coordRef.current = [clientX, clientY];
      setpopover(true);
    } else {
      setpopover(false);
    }
    if (target.matches("#focus")) {
      setshowcomments((prev) => true);
      setTimeout(() => {
        textareaRef.current.focus();
      }, 500);
    }
  }

  return (
    <div onClick={handleClick} onWheel={() => setpopover(false)}>
      <strong className="detail-title">{title}</strong>
      <div style={{ padding: "0.5rem 0", borderBottom: "1px solid #323232" }}>
        <div className="author-and-date">
          {nickname} | {createdDate?.split(".")[0]}
        </div>
        <div className="icons">
          <i className="icon-box icon-info icon-views w-5 h-5 relative top-1"></i>
          21
          <i className="icon-box icon-comment icon-info w-5 h-5 relative top-1"></i>
          22
          <i className="icon-box icon-up icon-info w-5 h-5"></i>22
          <i className="icon-box icon-down icon-info w-5 h-5 relative top-1"></i>
          22
        </div>
      </div>
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

        <div className="text-center my-7">
          <button className="btn">
            <i className="icon-box icon-info icon-up  w-5 h-5"></i> 0
          </button>
          <button className="btn">
            <i className="icon-box icon-info icon-down  w-5 h-5"></i> 0
          </button>
        </div>
        <div className="userinfo-box">
          <i className="icon-box icon-etc icon-user  w-10 h-10"></i>
          <div style={{ marginLeft: "1rem" }}>
            <span style={{ marginLeft: "5px" }}>{nickname}</span>
            <div className="icons">
              <i className="icon-box icon-info icon-article w-5 h-5 relative top-1"></i>
              21
              <i className="icon-box icon-comment icon-info w-5 h-5 ml-1 relative top-1"></i>
              22
            </div>
          </div>
        </div>
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
        <div className="flex justify-between">
          <span id="show-comments" className="cursor-pointer">
            <div className="mt-2" id="show-comments">
              {showcomments ? (
                <i
                  className="icon-box icon-info icon-up w-5 h-5"
                  id="show-comments"
                ></i>
              ) : (
                <i
                  className="icon-box icon-info icon-down w-5 h-5"
                  id="show-comments"
                ></i>
              )}
              댓글 {comments.length}
            </div>
          </span>
          <div>
            <span id="report" className="cursor-pointer">
              신고
              <i
                className="icon-box icon-info icon-down w-5 h-5 relative top-1"
                id="report"
              ></i>
            </span>
            <button
              className="bg-gray-700 text-white w-20 h-10 ml-4"
              id="focus"
            >
              댓글
            </button>
          </div>
        </div>
      </div>
      {showcomments && (
        <Comments
          comments={comments}
          articleId={articleId}
          boardId={id}
          ref={textareaRef}
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
