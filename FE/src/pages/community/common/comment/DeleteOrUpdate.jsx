/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";

export function DeleteOrUpdate({
  setInputPw,
  handleDelete,
  readyUpdate,
  inputMode,
}) {
  return (
    <Box xs={{ display: "flex", flexDirection: "row" }}>
      <input
        type="password"
        className="h-7 rounded"
        placeholder="비밀번호"
        name="password"
        onChange={(e) => setInputPw(e.target.value)}
        style={{
          borderRadius: 10,
          borderStyle: "solid",
          borderColor: "#f93d59",
          backgroundColor: "#ffe2e180",
          width: "140px",
        }}
      />
      <Button
        id="delete"
        onClick={handleDelete}
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
        id="update"
        onClick={readyUpdate}
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
