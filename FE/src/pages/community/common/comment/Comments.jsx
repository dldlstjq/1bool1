/* eslint-disable no-unused-vars */

import React, { useState, useRef, useEffect } from "react";

import axios from "axios";

import Comment from "./Comment";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";

const Comments = ({ which, detailId }) => {
  const [showComments, setShowComments] = useState(true);
  const [comments, setComments] = useState([]);
  const textareaRef = useRef();
  const buttonRef = useRef();
  const [inputs, setInputs] = useState({
    nickname: "",
    password: "",
    content: "",
  });
  const [foo, refresh] = useState(0);

  let url = "comment/";
  let idForData = "boardId";
  if (which === "recipe") {
    url = "recipereview/";
    idForData = "recipeId";
  } else if (which === "goods") {
    url = "goodsreview/";
    idForData = "goodsId";
  }

  useEffect(() => {
    axios({
      method: "get",
      url: url + detailId,
    })
      .then((res) => setComments(res.data.object))
  }, [url, detailId, foo]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  }

  function handleClick({ target }) {
    if (target.matches("#submit-comment")) {
      const { password, content, nickname } = inputs;
      if (!password || !content || !nickname) {
        alert("비어있는 값이 있습니다");
        return;
      }
      const data = { ...inputs, [idForData]: detailId };
      axios({
        method: "post",
        url: url + detailId,
        data,
      })
        .then(() => refresh((prev) => (prev += 1)))

    } else if (target.matches("#toggle-comments")) {
      setShowComments((prev) => !prev);
    }
  }

  return (
    <div onClick={handleClick}>
      <button id="toggle-comments">댓글 {comments?.length}</button>
      {showComments && (
        <div
          className="p-3 bg-stone-200 border border-stone-300 grid grid-cols-2 gap-2"
          style={{ backgroundColor: "#ffe2e180" }}
        >
          <input
            type="text"
            name="nickname"
            className="h-10"
            placeholder="닉네임"
            required
            ref={textareaRef}
            onChange={handleInputChange}
          />
          <input
            type="password"
            className="h-10"
            placeholder="비밀번호"
            required
            name="password"
            onChange={handleInputChange}
          />

          <textarea
            name="content"
            id=""
            className="h-24 focus:outline-none border border-stone-300 col-span-2"
            placeholder="댓글을 작성해주세요"
            required
            type="text"
            onChange={handleInputChange}
          ></textarea>
          <button
            className="bg-gray-700 w-20 h-10 text-white col-span-2 ml-auto"
            id="submit-comment"
            ref={buttonRef}
            style={{
              backgroundColor: "#f93d59",
              color: "white",
              fontWeight: "bold",
              borderRadius: 20,
              height: "2rem",
              marginTop: "1rem",
            }}
          >
            등록
          </button>
        </div>
      )}
      <Box sx={{ marginTop: "2rem" }}>
        {showComments &&
          comments?.map((commentData, idx) => (
            <Comment
              key={idx}
              commentData={commentData}
              idForData={idForData}
              setComments={setComments}
              detailId={detailId}
              url={url}
            />
          ))}
      </Box>
    </div>
  );
};

export default Comments;
