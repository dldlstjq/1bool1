/* eslint-disable no-unused-vars */

import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Container, Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";

import Article from "./Article";
import { Searchbar } from "../common/searchbar/Searchbar";
import RecentLikeBookmark from "../common/WriteOrderBtns";
import Footer from "../../../components/main/Footer";
import Pagination from "react-js-pagination";
import Appbar from "../../../components/main/Appbar";

function Articles() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const like = useRef([]);
  const recent = useRef([]);
  const [articles, setArticles] = useState([]);
  const user_id = localStorage.getItem("user_id");
  const userLike = user_id && JSON.parse(localStorage.getItem("board"));
  useEffect(() => {
    axios({
      method: "get",
      url: "board",
      params: { page: 0, size: 999 },
    })
      .then((res) => {
        recent.current = res.data.object;
        setArticles(res.data.object);
        const boardIdArray = res.data.object.map((el) => el.id);
        localStorage.setItem("boardIdArray", JSON.stringify(boardIdArray));
      })
    axios({
      method: "get",
      url: "board/like",
      params: { page: 0, size: 999 },
    })
      .then((res) => (like.current = res.data.object.content))
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
    } else if (target.matches("#bookmark")) {
      if (!user_id) {
        alert("로그인이 필요합니다");
        setArticles([]);
        return;
      }
      setArticles(
        like.current.filter(
          (article) =>
            userLike.findIndex((likeArticle) => likeArticle.id === article.id) >
            -1
        )
      );
    }
  }
  const handlePageChange = (page) => {
    setPage(page);
  };
  return (
    <div>
      <Appbar />

      <div
        className="p-1 sm:p-0 sm:w-11/12 md:w-3/4 lg:w-2/3 mx-auto"
        style={{ minHeight: "calc(100vh - 170px" }}
        onClick={handleClick}
      >
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
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} style={{ paddingLeft: 40 }}>
            <RecentLikeBookmark setState={setArticles} />
          </Grid>
          <Grid item xs={12} md={6} style={{ paddingRight: 25 }}>
            <Box
              style={{
                display: "flex",
                justifyContent: "end",
                marginBottom: "1rem",
              }}
            >
              <Searchbar url="board/search" setState={setArticles} />
              <Button
                id="write"
                style={{
                  marginLeft: "1rem",
                  backgroundColor: "#F93D59",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: 10,
                  height: "2rem",
                  marginTop: "10px",
                }}
              >
                글쓰기
              </Button>
            </Box>
          </Grid>
        </Grid>

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
      </div>
      <Footer />
    </div>
  );
}

export default Articles;
