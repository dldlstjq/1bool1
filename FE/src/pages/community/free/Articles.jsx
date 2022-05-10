/* eslint-disable no-unused-vars */

import {
  Link,
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";
import { BASE_URL } from "../../..";

import Article from "./Article";
import { Pagination } from "../common/Pagination";
import { Searchbar, useSearchBar } from "../common/Searchbar";
import Popover from "../common/Popover";
import { articleOptions } from "../common/Searchbar";
import { useFetch } from "../common/hooks";

function Articles() {
  const [popover, setPopover] = useState(false);
  const [coord, setCoord] = useState([0, 0]);
  // const [articles, setArticles] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });

  const [filter, setFilter] = useState({ category: "title", content: "" });
  const { category, content } = filter;

  const navigate = useNavigate();
  const page = searchParams.get("page");

  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: BASE_URL + "board",
  //     params: { page: page - 1, size: 5 },
  //   })
  //     .then((res) => {
  //       if (res.data.object?.length > 0) setArticles(res.data.object);
  //     })
  //     .catch((err) => console.log(err));
  // }, [page]);
  const articles = useFetch("board", page, 10);

  function handleClick({ target, clientX, clientY }) {
    // console.log(target);
    if (target.matches(".article-title")) {
      navigate(target.id);
    } else if (target.matches(".author")) {
      setCoord(() => [clientX, clientY]);
      setPopover(true);
    } else {
      setPopover(false);
    }
  }

  return (
    <div
      className="articles"
      onClick={handleClick}
      onWheel={() => setPopover(false)}
    >
      <>
        <div className="title">자유 게시판</div>
        <span>
          여러 모험가님들과 다양한 주제에 대해 자유롭게 소통하는 공간입니다.
        </span>
      </>

      <Link className="head write-btn" to="/community/free/write">
        글쓰기
      </Link>

      <div className="head">
        <input
          type="radio"
          id="order-by-date"
          className="blind"
          name="contact"
          value="email"
        />
        <label
          htmlFor="order-by-date"
          style={{ marginLeft: "1rem" }}
          className="tracking-tighter text-white"
        >
          <i className="icon-box icon-info icon-down w-5 h-4 relative"></i>
          등록일순
        </label>

        <input
          type="radio"
          id="order-by-views"
          name="contact"
          value="phone"
          className="blind"
        />
        <label
          htmlFor="order-by-views"
          className="tracking-tighter ml-3 text-white"
        >
          <i className="icon-box icon-info icon-down w-5 h-4 relative"></i>
          조회순
        </label>

        <input
          type="radio"
          id="order-by-comments"
          name="contact"
          value="mail"
          className="blind"
        />
        <label
          htmlFor="order-by-comments"
          className="tracking-tighter ml-3 text-white"
        >
          <i className="icon-box icon-info icon-down w-5 h-4 relative"></i>
          댓글순
        </label>

        <input
          type="radio"
          id="order-by-likes"
          name="contact"
          value="mail"
          className="blind"
        />
        <label
          htmlFor="order-by-likes"
          className="tracking-tighter ml-3 text-white"
        >
          <i className="icon-box icon-info icon-down w-5 h-4 relative"></i>
          공감순
        </label>
      </div>

      <ul>
        {articles
          .filter((article) => {
            return article[category].search(content) > -1;
          })
          .map(({ id, title, nickname, password, modifiedDate }) => {
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

      <Pagination
        setSearchParams={setSearchParams}
        cols="col-span-2"
        my="my-5"
      />

      <Link className="head write-btn" to="/community/free/write">
        글쓰기
      </Link>
      <Searchbar setFilter={setFilter} options={articleOptions} />
      {popover && (
        <Popover x={coord[0]} y={coord[1]}>
          응응
        </Popover>
      )}
    </div>
  );
}

export default Articles;
