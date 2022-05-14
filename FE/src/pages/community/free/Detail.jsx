/* eslint-disable no-unused-vars */

import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useFetchItem, useFetchListAndUpdate } from "../common/hooks";

import Popover from "../common/Popover";
import Comments from "../common/comment/Comments";
import UpperInfo from "./components/UpperInfo";
import { DeleteOrUpdate } from "./DeleteOrUpdate";
import classNames from "classnames";

function Detail() {
  const { articleId } = useParams();
  const [popover, setpopover] = useState(false);
  const [showcomments, setShowcomments] = useState(true);
  const [foo, refresh] = useState(0);
  const [articlePw, setarticlePw] = useState("");

  const coordRef = useRef([0, 0]);
  const navi = useNavigate();

  const [articleData] = useFetchItem(`board/${articleId}`, []);
  const comments = useFetchListAndUpdate(`comment/${articleId}`, foo);
  const [like, setLike] = useFetchItem(`board/like/${articleId}`, 0);

  const { title, content, modifiedDate, id, nickname, password, photo } =
    articleData;

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

        <div className="text-center my-7">
          <button className="btn">
            <i
              className={classNames("icon-box icon-info w-5 h-5", "icon-up")}
            ></i>
            {like}
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
