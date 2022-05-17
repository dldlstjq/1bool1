/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Typography, Box, Button, TextField} from '@mui/material';


export function DeleteOrUpdate({
  password,
  afterUrl,
  state,
  updatePageUrl,
  url,
  params,
  refresh,
}) {
  const [inputPw, setInputPw] = useState("");
  const navi = useNavigate();

  function handleDelete() {
    if (inputPw === password) {
      axios({
        method: "delete",
        url,
        params,
      })
        .then(() => {
          if (afterUrl) setTimeout(() => navi(afterUrl), 1000);
          else {
            setTimeout(() => refresh((prev) => (prev += 1)), 1000);
          }
        })
        .catch((err) => console.log(err));
      return;
    }
    alert("비밀번호가 다릅니다");
  }

  function toUpdatePage() {
    if (inputPw === password) {
      navi(updatePageUrl, { state });
      return;
    }
    alert("비밀번호가 다릅니다");
  }

  return (
    // <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2 mt-4">
    <Box xs={{display:'flex', alignSelf:'end'}}>
      <input
        type="password"
        className="h-7 rounded"
        placeholder="비밀번호"
        name="articlePw"
        onChange={(e) => setInputPw(e.target.value)}
      />
      <Button
        id="delete"
        onClick={handleDelete}
        style={{ backgroundColor: 'white', borderRadius: 10, color:'grey', border: '1px solid' , marginRight:5, fontWeight:'bold' }}
      >
        글삭제
      </Button>
      <Button
        id="update"
        onClick={toUpdatePage}
        style={{ backgroundColor: 'white', borderRadius: 10, color:'grey', border: '1px solid' , marginRight:5, fontWeight:'bold' }}
      >
        글수정
      </Button>
    </Box>
  );
}
