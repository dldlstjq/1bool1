/* eslint-disable no-unused-vars */

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import axios from "axios";

import Article from "./Article";
import { Pagination } from "../common/Pagination";
import { Searchbar } from "../common/Searchbar";
import Popover from "../common/Popover";
import { useFetchPage } from "../common/hooks";
import ButtonAndPerPage from "../common/WriteOrderBtns";

function Articles() {
  const [popover, setPopover] = useState(false);
  const [coord, setCoord] = useState([0, 0]);
  const [searchParams, setSearchParams] = useSearchParams([["page", "1"]]);
  const [size, setSize] = useState(10);
  const [orderBy, setOrderBy] = useState("board");

  const navigate = useNavigate();
  const pageParam = searchParams.get("page");
  let page = 0;
  if (pageParam) page = parseInt(pageParam) - 1;

  const [articles, setArticles] = useFetchPage(orderBy, page, size);

  function handleClick(e) {
    if (e.target.matches(".article-title")) {
      navigate(e.target.id);
    }
    if (e.target.matches("#write")) {
      navigate("write");
    }
    if (e.target.matches("#order-by-like")) {
      if (orderBy === "board") {
        setOrderBy("board/like");
        return;
      }
      setOrderBy("board");
    }
  }

  return (
    <div
      className="p-4"
      onClick={handleClick}
      onWheel={() => setPopover(false)}
    >
      <div className="title">자유 게시판</div>
      <span>다양한 주제에 대해 자유롭게 소통하는 공간입니다.</span>

      <ButtonAndPerPage setSize={setSize} setState={setArticles} />

      <ul>
        {articles?.map(
          ({ id, title, nickname, password, modifiedDate }, idx) => {
            const date = modifiedDate?.split(".")[0];
            return (
              <Article
                id={id}
                key={idx}
                title={title}
                nickname={nickname}
                password={password}
                date={date}
              />
            );
          }
        )}
      </ul>

      <Pagination
        setSearchParams={setSearchParams}
        cols="col-span-2"
        my="my-5"
      />

      <ButtonAndPerPage setSize={setSize} />
      <Searchbar url="board/search" setState={setArticles} />
      {popover && (
        <Popover x={coord[0]} y={coord[1]}>
          응응
        </Popover>
      )}
    </div>
  );
}

export default Articles;
