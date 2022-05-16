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

  const navigate = useNavigate();
  const page = searchParams.get("page") ?? 0;
  const [articles, setArticles] = useFetchPage("board", page, size);

  function handleClick({ target, clientX, clientY }) {
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
    if (target.matches("#order-by-like")) {
      axios({
        method: "get",
        url: "board/like",
      })
        .then((res) => setArticles(res.data.object))
        .catch((err) => console.log(err));
    }
  }

  return (
    <div
      className="articles"
      onClick={handleClick}
      onWheel={() => setPopover(false)}
    >
      <div className="title">자유 게시판</div>
      <span>
        여러 모험가님들과 다양한 주제에 대해 자유롭게 소통하는 공간입니다.
      </span>

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
