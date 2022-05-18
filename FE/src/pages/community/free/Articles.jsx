/* eslint-disable no-unused-vars */
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import axios from "axios";

import Article from "./Article";
import { Searchbar } from "../common/searchbar/Searchbar";
import RecentLikeBookmark from "../common/WriteOrderBtns";
import Appbar from "../../../components/main/Appbar";
import Footer from "../../../components/main/Footer";
import Pagination from "react-js-pagination";

function Articles() {
  const [page, setPage] = useState(1);
  const like = useRef([]);
  const recent = useRef([]);
  const [articles, setArticles] = useState([]);
  const handlePageChange = (page) => {
    setPage(page);
  };
  const navigate = useNavigate();
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
      .then((res) => (like.current = res.data.object.content))
      .catch((err) => console.log(err));
  }, []);

  function handleClick({ target }) {
    // const { target } = e;
    // if (target.matches("#write")) {
    //   navigate("write");
    // }
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
    <div>
      <Appbar />

      <div
        className="p-1 sm:p-0 sm:w-11/12 lg:w-2/3 mx-auto"
        onClick={handleClick}
      >
        <div className="text-4xl ml-2 my-10">TOP 4</div>
        <div className="md:flex justify-between items-center mb-2">
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
        </div>

        <div className="border-t-2 border-slate-700">
          {articles
            .slice(20 * (page - 1), 20 * (page - 1) + 20)
            .map((data, idx) => {
              return <Article data={data} key={idx} />;
            })}
        </div>

        <Pagination
          activePage={page}
          itemsCountPerPage={5}
          totalItemsCount={articles.length}
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
