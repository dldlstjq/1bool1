/* eslint-disable no-unused-vars */

import {
  Link,
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import axios from "axios";
import { BASE_URL } from "../../..";

import Article from "./Article";
import { Pagination } from "../common/Pagination";
import { Searchbar, useSearchBar } from "../common/Searchbar";
import Popover from "../common/Popover";
import { articleOptions } from "../common/Searchbar";
import { useFetchPage } from "../common/hooks";

function Articles() {
  // console.log("articles render");
  const [popover, setPopover] = useState(false);
  const [coord, setCoord] = useState([0, 0]);
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const [size, setSize] = useState(10);

  const [filter, setFilter] = useState({ category: "title", content: "" });
  const { category, content } = filter;

  const navigate = useNavigate();
  const page = searchParams.get("page") ? searchParams.get("page") - 1 : 0;

  const articles = useFetchPage("board", page, size);

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
    if (target.matches("#write")) {
      navigate("write");
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
      <div className="grid grid-cols-2 gap-2 mt-10">
        <button
          className="h-10 border-b border-slate-300 bg-slate-100 sm:col-span-2"
          id="write"
        >
          글쓰기
        </button>
        <select
          name="order"
          id="order"
          className="h-10 border-b border-slate-300 bg-slate-100 text-center lg:col-span-2"
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="">목록개수</option>
          <option value="10"> 10 </option>
          <option value="20"> 20 </option>
          <option value="30"> 30 </option>
          <option value="40"> 40 </option>
          <option value="50"> 50 </option>
          <option value="100"> 100 </option>
        </select>
      </div>
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
          ?.filter((article) => {
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
