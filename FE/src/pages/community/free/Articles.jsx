/* eslint-disable no-unused-vars */

import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Container, Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";

import Article from "./Article";
import { Searchbar } from "../common/searchbar/Searchbar";
import { useFetchPage } from "../common/hooks";
import RecentLikeBookmark from "../common/WriteOrderBtns";
import Appbar from "../../../components/main/Appbar";
import Footer from "../../../components/main/Footer";
import Pagination from "react-js-pagination";

function Articles() {
  const navigate = useNavigate();
  // const pageParam = searchParams.get("page");
  const [page, setPage] = useState(1);
  // const [top10,setTop10] = useState([])
  // const like = useRef([]);
  const [like, setLike] = useState();
  const recent = useRef([]);
  const [articles, setArticles] = useState([]);
  const handlePageChange = (page) => {
    setPage(page);
  };
  useEffect(() => {
    axios({
      method: "get",
      url: "board",
      params: { page: 0, size: 999999 },
    })
      .then((res) => {
        recent.current = res.data.object;
        setArticles(res.data.object);
      })
      .catch((err) => console.log(err));
    axios({
      method: "get",
      url: "board/like",
      params: { page: 0, size: 999999 },
    })
      .then((res) => setLike(res.data.object.content))
      .catch((err) => console.log(err));
  }, []);

  function handleClick({ target }) {
    if (target.matches("#write")) {
      navigate("write");
    }
    if (target.matches("#order-by-like")) {
      setArticles(like.current);
      return;
    }
    if (target.matches("#order-by-recent")) {
      setArticles(recent.current);
      return;
    }
    // } else if (target.matches("#bookmark")) {
    //   alert("유저가 북마크한 리스트를 주세요");
    // }
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Appbar />

      <div
        className="p-1 sm:p-0 sm:w-11/12 md:w-3/4 lg:w-2/3 mx-auto"
        onClick={handleClick}
      >
        <div className="text-4xl lg:text-5xl font-bold">TOP 10</div>
        {/* <div className="border-t-2 border-slate-700">
          {like
            ?.slice(20 * (page - 1), 20 * (page - 1) + 20)
            .map((data, idx) => {
              return <Article data={data} key={idx} />;
            })}
        </div> */}

        <Box
          style={{ display: "flex", flexDirection: "row", marginTop: "2rem" }}
        >
          <Typography
            variant="h4"
            style={{
              fontWeight: "bold",
              display: "flex",
              justifyContent: "start",
              paddingTop: 10,
              marginLeft: 10,
            }}
          >
            자유게시판
          </Typography>
        </Box>

        <RecentLikeBookmark setState={setArticles} />
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
          {articles
            ?.slice(20 * (page - 1), 20 * (page - 1) + 20)
            .map((data, idx) => {
              return <Article data={data} key={idx} />;
            })}
        </div>

        <Pagination
          activePage={page}
          itemsCountPerPage={5}
          totalItemsCount={articles?.length || 0}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        ></Pagination>
        <div className="text-center mt-10">
          <Searchbar url="board/search" setState={setArticles} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Articles;
