/* eslint-disable no-unused-vars */

import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";
import { BASE_URL } from "../../index";

import Article from "./Article";
import Pagination from "./Pagination";
import Searchbar from "./Searchbar";
import Popover from "./Popover";

function Articles() {
  const { category } = useParams();
  const [popover, setpopover] = useState(false);
  const [coord, setcoord] = useState([0, 0]);
  const [articles, setarticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("rendered");
    axios({
      method: "get",
      url: BASE_URL + "board",
      params: { page: 0, size: 10 },
    })
      .then((res) => setarticles(res.data.object))
      .catch((err) => console.log(err));
    // return () => {};
  }, []);

  function handleClick({ target, clientX, clientY }) {
    // console.log(target);
    if (target.matches(".article-title")) {
      navigate(target.id);
    } else if (target.matches(".author")) {
      setcoord(() => [clientX, clientY]);
      setpopover(true);
    } else {
      setpopover(false);
    }
  }

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

      {category === "free" && (
        <Link className="head write-btn" to="/community/write">
          글쓰기
        </Link>
      )}

      {category === "recipe" && (
        <Link className="head write-btn" to="/community/writeRecipe">
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
          <i className="icon-box icon-info icon-down w-5 h-4 top-2 relative"></i>
          등록일순
        </label>

        <input
          type="radio"
          id="order-by-views"
          name="contact"
          value="phone"
          className="blind"
        />
        <label htmlFor="order-by-views">
          <i className="icon-box icon-info icon-down w-5 h-4 top-2 relative"></i>
          조회순
        </label>

        <input
          type="radio"
          id="order-by-comments"
          name="contact"
          value="mail"
          className="blind"
        />
        <label htmlFor="order-by-comments">
          <i className="icon-box icon-info icon-down w-5 h-4 top-2 relative"></i>
          댓글순
        </label>

        <input
          type="radio"
          id="order-by-likes"
          name="contact"
          value="mail"
          className="blind"
        />
        <label htmlFor="order-by-likes">
          <i className="icon-box icon-info icon-down w-5 h-4 top-2 relative"></i>
          공감순
        </label>
      </div>

      <ul>
        {articles.map(({ id, title, nickname, password, modifiedDate }) => {
          const date = modifiedDate.split(".")[0];
          return (
            <Article
              id={id}
              key={id}
              title={title}
              nickname={nickname}
              password={password}
              date={date}
            />
          );
        })}
      </ul>

      <Pagination />

      {category === "free" && (
        <Link className="head write-btn" to="/community/write">
          글쓰기
        </Link>
      )}
      {category === "recipe" && (
        <Link className="head write-btn" to="/community/writeRecipe">
          글쓰기
        </Link>
      )}
      <Searchbar />
      {popover && (
        <Popover x={coord[0]} y={coord[1]}>
          응응
        </Popover>
      )}
    </div>
  );
}

export default Articles;
