/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
} from "@mui/material";

export function DeleteOrUpdate({ setCheckPw, inputMode }) {
  return (
    <Box xs={{ display: "flex", flexDirection: "row" }}>
      <input
        type="password"
        className="h-7 rounded"
        placeholder="비밀번호"
        name="password"
        onChange={(e) => setCheckPw(e.target.value)}
        style={{
          borderRadius: 10,
          borderStyle: "solid",
          borderColor: "#f93d59",
          backgroundColor: "#ffe2e180",
          width: "140px",
        }}
      />
      <Button
        id="delete-comment"
        style={{
          backgroundColor: "white",
          borderRadius: 10,
          color: "grey",
          border: "1px solid",
          marginRight: 5,
          marginLeft: 5,
          fontWeight: "bold",
        }}
      >
        삭제
      </Button>
      <Button
        id="update-comment"
        style={{
          backgroundColor: "white",
          borderRadius: 10,
          color: "grey",
          border: "1px solid",
          fontWeight: "bold",
        }}
      >
        {inputMode ? "취소" : "수정"}
      </Button>
    </Box>
  );
}
