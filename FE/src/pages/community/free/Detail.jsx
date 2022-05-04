/* eslint-disable no-unused-vars */

import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import { BASE_URL } from "../../..";
import axios from "axios";

import Pagination from "../common/Pagination";
import Popover from "../common/Popover";
import Comments from "../common/Comments";

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
    id,
    nickname,
    password,
    photo,
    createdDate,
  } = data;

  useEffect(() => {
    axios
      .get(BASE_URL + `board/${articleId}`)
      .then((res) => setdata(res.data.object))
      .catch((err) => console.log(err));
  }, [articleId]);

  useEffect(() => {
    axios
      .get(BASE_URL + `comment/${articleId}`)
      .then((res) => setcomments(res.data.object))
      .catch((err) => console.log(err));
  }, [articleId]);

  function handleClick({ target, clientX, clientY }) {
    if (target.matches("#show-comments")) {
      axios
        .get(BASE_URL + "comment/" + articleId)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
    if (target.matches("#report")) {
      coordRef.current = [clientX, clientY];
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
      <Comments comments={comments} />
      <Pagination mb="mb-10" />
      <Link to="/community/free" className="py-2 px-4 mt-20 bg-32 text-white">
        목록보기
      </Link>
      {popover && (
        <Popover x={coordRef.current[0]} y={coordRef.current[1]}>
          <h6>ㅇㅇ</h6>
        </Popover>
      )}
    </div>
  );
}

export default Detail;
