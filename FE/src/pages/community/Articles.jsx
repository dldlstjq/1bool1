import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

import Article from "./Article";
import Pagination from "./Pagination";
import Searchbar from "./Searchbar";
import Popover from "./Popover";

function Articles() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [popover, setpopover] = useState(false);
  const [coord, setcoord] = useState([0, 0]);

  function handleClick({ target, clientX, clientY }) {
    // console.log(target);
    if (target.matches(".article-title")) {
      navigate("detail");
    } else if (target.matches(".author")) {
      setcoord(() => [clientX, clientY]);
      setpopover(true);
    } else {
      setpopover(false);
    }
  }

  // function renderPopover(x, y, author) {}

  return (
    <div
      className="articles"
      onClick={handleClick}
      onWheel={() => setpopover(false)}
    >
      {category === "all" && (
        <>
          <div className="title">전체글</div>
        </>
      )}
      {category === "free" && (
        <>
          <div className="title">자유 게시판</div>
          <span>
            여러 모험가님들과 다양한 주제에 대해 자유롭게 소통하는 공간입니다.
          </span>
        </>
      )}
      {category === "recipe" && (
        <>
          <div className="title">레시피</div>
          <span>편의점 레시피를 공유하는 게시판입니다</span>
        </>
      )}
      {!category && (
        <>
          <div className="title">전체글</div>
        </>
      )}

      {category && category !== "all" && (
        <Link className="head write-btn" to="/community/write">
          글쓰기
        </Link>
      )}
      <div className="head">
        <input
          type="radio"
          id="order-by-date"
          className="blind"
          name="contact"
          value="email"
        />
        <label htmlFor="order-by-date" style={{ marginLeft: "1rem" }}>
          <i className="icon icon-filter"></i>등록일순
        </label>

        <input
          type="radio"
          id="order-by-views"
          name="contact"
          value="phone"
          className="blind"
        />
        <label htmlFor="order-by-views">
          <i className="icon icon-filter"></i>조회순
        </label>

        <input
          type="radio"
          id="order-by-comments"
          name="contact"
          value="mail"
          className="blind"
        />
        <label htmlFor="order-by-comments">
          <i className="icon icon-filter"></i>댓글순
        </label>

        <input
          type="radio"
          id="order-by-likes"
          name="contact"
          value="mail"
          className="blind"
        />
        <label htmlFor="order-by-likes">
          <i className="icon icon-filter"></i>공감순
        </label>
      </div>

      <ul>
        <Article noti />
        <Article />
      </ul>

      <Pagination />

      {category && category !== "all" && (
        <Link className="head write-btn" to="/community/write">
          글쓰기
        </Link>
      )}

      <Searchbar />
      {popover && <Popover x={coord[0]} y={coord[1]}></Popover>}
    </div>
  );
}

export default Articles;
