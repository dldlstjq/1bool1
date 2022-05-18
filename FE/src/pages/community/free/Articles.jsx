/* eslint-disable no-unused-vars */

import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

import Article from "./Article";
import { Pagination } from "../common/Pagination";
import { Searchbar } from "../common/Searchbar";
import { useFetchPage } from "../common/hooks";
import ButtonAndPerPage from "../common/WriteOrderBtns";
import Appbar from "../../../components/main/Appbar";
import Footer from "../../../components/main/Footer";

function Articles() {
  const [searchParams, setSearchParams] = useSearchParams([["page", "1"]]);
  const [size, setSize] = useState(20);
  const [orderBy, setOrderBy] = useState("board");

  const navigate = useNavigate();
  const pageParam = searchParams.get("page");
  let page = 0;
  if (pageParam) {
    if (orderBy === "board/like") {
      page = parseInt(pageParam);
    } else {
      page = parseInt(pageParam) - 1;
    }
  }

  const [articles, setArticles] = useFetchPage(orderBy, page, size);

  function handleClick(e) {
    const { target } = e;
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
    <>
      <Appbar />
      <div className="p-px md:px-20 lg:px-40" onClick={handleClick}>
        <h1 className="title text-4xl lg:text-6xl mb-5">자유게시판</h1>

        <ButtonAndPerPage setSize={setSize} setState={setArticles} />
        <div className="text-right mr-1 my-2">
          <Searchbar url="board/search" setState={setArticles} />
          <button
            id="write"
            style={{
              padding: "1px",
              marginLeft: "1rem",
              backgroundColor: "#F93D59",
              color: "white",
              fontWeight: "bold",
              borderRadius: 5,
              height: "2rem",
              marginTop: "10px",
            }}
          >
            글쓰기
          </button>
        </div>

        <div className="border-t-2 border-slate-700">
          {articles?.map((data, idx) => {
            return <Article key={idx} data={data} />;
          })}
        </div>

        <Pagination
          setSearchParams={setSearchParams}
          cols="col-span-2"
          my="my-5"
        />
        <div className="text-center">
          <Searchbar url="board/search" setState={setArticles} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Articles;
