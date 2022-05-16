/* eslint-disable no-unused-vars */

import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

import Article from "./Article";
import { Pagination } from "../common/Pagination";
import { Searchbar } from "../common/Searchbar";
import { useFetchPage } from "../common/hooks";
import ButtonAndPerPage from "../common/WriteOrderBtns";

function Articles() {
  const [searchParams, setSearchParams] = useSearchParams([["page", "1"]]);
  const [size, setSize] = useState(10);
  const [orderBy, setOrderBy] = useState("board");

  const navigate = useNavigate();
  const pageParam = searchParams.get("page");
  let page = 0;
  if (pageParam) page = parseInt(pageParam) - 1;

  const [articles, setArticles] = useFetchPage(orderBy, page, size);

  function handleClick(e) {
    const { target } = e;
    if (target.matches(".title")) {
      navigate(e.target.id);
    }
    if (target.matches("#write")) {
      navigate("write");
    }
    if (target.matches("#order-by-like")) {
      setOrderBy("board/like");
    } else if (target.matches("#order-by-recent")) {
      setOrderBy("board");
    } else if (target.matches("#bookmark")) {
      alert("유저가 북마크한 리스트를 주세요");
    }
  }

  return (
    <div className="p-4 md:px-20 lg:px-40" onClick={handleClick}>
      <h1 className="title text-red-500 text-4xl lg:text-6xl mb-5">
        자유게시판
      </h1>
      <span>다양한 주제에 대해 자유롭게 소통하는 공간입니다.</span>

      <ButtonAndPerPage setSize={setSize} setState={setArticles} />

      {articles?.map(({ id, title, nickname, password, modifiedDate }, idx) => {
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
      })}

      <Pagination
        setSearchParams={setSearchParams}
        cols="col-span-2"
        my="my-5"
      />

      <ButtonAndPerPage setSize={setSize} />
      <Searchbar url="board/search" setState={setArticles} />
      {/* {popover && (
        <Popover x={coord[0]} y={coord[1]}>
          응응
        </Popover>
      )} */}
    </div>
  );
}

export default Articles;
