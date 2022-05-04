/* eslint-disable no-unused-vars */

import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import { BASE_URL } from "../..";
import axios from "axios";

import Pagination from "./Pagination";
import Popover from "./Popover";

function Detail() {
  const { articleId } = useParams();
  const [data, setdata] = useState({});
  const [comments, setcomments] = useState([]);
  const [popover, setpopover] = useState(false);
  const coordRef = useRef([0, 0]);

  const {
    title,
    content,
    modifiedDate,
    // id,
    nickname,
    // password,
    // photo,
    createdDate,
  } = data;

  useEffect(() => {
    axios
      .get(BASE_URL + `board/${articleId}`)
      .then((res) => setdata(res.data.object))
      .catch((err) => console.log(err));

    // return () => {
    //   second;
    // };
  }, [articleId]);
  // console.log(articleId);

  function handleClick({ target, clientX, clientY }) {
    if (target.matches("#show-comments")) {
      axios
        .get(BASE_URL + "comment/" + articleId)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
    if (target.matches("#report")) {
      coordRef.current = [clientX, clientY];
      console.log(coordRef);
      setpopover(true);
    } else {
      setpopover(false);
    }
  }

  return (
    <div onClick={handleClick} onWheel={() => setpopover(false)}>
      <strong className="detail-title">{title}</strong>
      <div style={{ padding: "0.5rem 0", borderBottom: "1px solid #323232" }}>
        <div className="author-and-date">
          {nickname} | {createdDate.split(".")[0]}
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
      <div className="relative">
        <i className="icon-box icon-sns w-20 h-6 absolute right-0"></i>
      </div>
      <div className="content-box">
        <div className="grey">
          최근 수정 일시 : {modifiedDate.split(".")[0]}{" "}
        </div>
        <p style={{ margin: "1.8rem 0" }}>{content}</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
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
        <div className="flex justify-between">
          <span id="show-comments" className="cursor-pointer">
            <div className="mt-2" id="show-comments">
              <i
                className="icon-box icon-info icon-down w-5 h-5"
                id="show-comments"
              ></i>
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
            <button className="bg-32 text-white w-20 h-10 ml-4">댓글</button>
          </div>
        </div>
      </div>
      {comments.length > 0 && (
        <div id="comment-box" className="bd-df p-4">
          <div className="flex justify-between">
            <div>
              <i className="icon-box icon-etc icon-user w-9 h-9"></i>{" "}
              <span className="relative bottom-3">[GM]루아</span>
            </div>
            <div>
              <button className="w-16 h-8 ml-3 bd-df">
                <i className="icon-box icon-info icon-up  w-5 h-5"></i> 0
              </button>
              <button className="w-16 h-8 ml-3 bd-df">
                <i className="icon-box icon-info icon-down  w-5 h-5"></i> 0
              </button>
            </div>
          </div>
          <div id="comment-content">달려라~ 우헹ㄶ메야훈메ㅑ웨ㅑㅇㅎ</div>
          <div id="comment-date" className="text-slate-500">
            2022-05-02 11:39
          </div>
        </div>
      )}
      <Pagination />
      <button className="w-20 h-10 ml-3 bg-32 text-white">목록보기</button>
      {popover && (
        <Popover x={coordRef.current[0]} y={coordRef.current[1]}>
          <h6>ㅇㅇ</h6>
        </Popover>
      )}
    </div>
  );
}

export default Detail;
