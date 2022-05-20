/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";

import axios from "axios";
import classNames from "classnames";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import Grid from "@mui/material/Grid";
import { DeleteOrUpdate } from "./DeleteOrUpdate";
import { Container, Typography, Box, Button, TextField } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Comment({ commentData, idForData, setComments, detailId, url }) {
  const [inputMode, setInputMode] = useState(false);
  const [checkPw, setCheckPw] = useState("");
  const { id, nickname, password, content } = commentData;
  const inputRef = useRef();

  function handleClick({ target }) {
    if (target.id === "delete-comment") {
      if (password !== checkPw) {
        alert("비밀번호가 일치하지 않습니다");
        return;
      }
      axios({
        method: "delete",
        url: url + detailId,
        params: { id, password },
      })
        .then(() => {
          setComments((prev) => prev.filter((comment) => comment.id !== id));
        })
      return;
    }
    if (target.id === "update-comment") {
      if (password !== checkPw) {
        alert("비밀번호가 일치하지 않습니다");
        return;
      }
      setInputMode((prev) => !prev);
      return;
    }
  }

  function handleSubmit(e) {
    if (e.key === "Enter") {
      axios({
        method: "put",
        url: url + detailId,
        data: {
          [idForData]: detailId,
          content: e.target.value,
          id,
          nickname,
          password,
        },
      })
        .then(() => {
          setInputMode(false);
          setComments((prev) =>
            prev.map((comment) =>
              comment.id === id
                ? { ...comment, content: e.target.value }
                : comment
            )
          );
        })
    }
  }

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderTop: 1,
        borderColor: "grey.500",
        padding: "0.5rem",
      }}
      onClick={handleClick}
    >
      <div>
        <Box sx={{ paddingTop: 1 }}>
          <Typography>
            {" "}
            <AccountCircleIcon style={{ marginRight: 3, color: "#F93D59" }} />
            {nickname}{" "}
          </Typography>
        </Box>
      </div>
      <Box sx={{ paddingLeft: 1, paddingTop: 1 }}>
        {!inputMode && <div id="comment-content">{content}</div>}
        <input
          type="text"
          defaultValue={content}
          onKeyDown={handleSubmit}
          ref={inputRef}
          className={classNames(
            "w-full",
            "rounded",
            inputMode && "border",
            inputMode && "border-purple-900",
            inputMode && "h-10",
            !inputMode && "h-0"
          )}
        />
      </Box>
      <Box style={{ display: "flex", justifyContent: "end" }}>
        <DeleteOrUpdate setCheckPw={setCheckPw} inputMode={inputMode} />
      </Box>
    </Box>
  );
}

export default Comment;
