import { useState, useRef } from "react";

import axios from "axios";
import classNames from "classnames";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import Grid from "@mui/material/Grid";
import { DeleteOrUpdate } from "./DeleteOrUpdate";

/* eslint-disable no-unused-vars */
interface Data {
  id: string;
  password: string;
  nickname: string;
  content: string;
  boardId?: string;
  recipeId?: string;
  goodsId?: string;
}
interface CommentProps {
  data: Data;
  refresh: React.Dispatch<React.SetStateAction<number>>;
  which: "board" | "recipe" | "goods";
  setComments: React.Dispatch<React.SetStateAction<any[]>>;
}
function Comment({ data, refresh, which, setComments }: CommentProps) {
  const [inputMode, setInputMode] = useState(false);
  const inputRef = useRef<any>(null);
  const [inputPw, setInputPw] = useState("");
  const { id, password, nickname, content, boardId, recipeId, goodsId } = data;

  let url = "comment";
  let detailId = boardId;
  if (which === "goods") {
    url = "goodsreview";
    detailId = goodsId;
  } else if (which === "recipe") {
    url = "recipereview";
    detailId = recipeId;
  }

  function handleSubmit(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      axios({
        method: "put",
        url: `${url}/${detailId}`,
        data: { ...data, content: (e.target as HTMLInputElement).value },
      })
        .then(() => {
          setInputMode(false);
          refresh((prev) => (prev += 1));
        })
        .catch((err) => console.log(err));
    }
  }

  function handleDelete() {
    if (inputPw === password) {
      axios({
        method: "delete",
        url,
        params: { id, password },
      })
        .then(() => setTimeout(() => refresh((prev) => (prev += 1)), 1000))
        .catch((err) => console.log(err));
      return;
    }
    alert("비밀번호가 다릅니다");
  }

  function readyUpdate() {
    if (inputMode === true) {
      setInputMode(false);
      return;
    } else if (inputPw === password) {
      setInputMode(() => true);
      inputRef.current.focus();
      return;
    }
    alert("비밀번호가 다릅니다");
  }

  return (
    <div className="p-1 border border-stone-300">
      <div>
        <div>
          {/* <i className='icon-box icon-etc icon-user w-9 h-9'></i>{' '}
          <span className='relative bottom-3'>{nickname}</span> */}
          <Grid container>
            <Grid lg={0.5}>
              <PersonPinIcon style={{ width: "40px", height: "40px" }} />
            </Grid>
            <Grid lg={11.5} style={{ marginTop: "20px" }}>
              <strong className="relative bottom-3" style={{ marginTop: 100 }}>
                {nickname}
              </strong>
            </Grid>
          </Grid>
        </div>

        {/* <div>
          <button className="w-16 h-8  bd-df">
            <i className="icon-box icon-info icon-up w-5 h-5"></i> 0
          </button>
          <button className="w-16 h-8 ml-2 bd-df">
            <i className="icon-box icon-info icon-down w-5 h-5"></i> 0
          </button>
        </div> */}
      </div>

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

      <DeleteOrUpdate
        setInputPw={setInputPw}
        handleDelete={handleDelete}
        readyUpdate={readyUpdate}
        inputMode={inputMode}
      />
    </div>
  );
}

export default Comment;
