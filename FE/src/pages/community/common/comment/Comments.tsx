/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";

import axios from "axios";

import { useFetchListAndUpdate } from "../hooks";

import Comment from "./Comment";

// import Popover from "../Popover";

interface CommentsProps {
  which: "board" | "recipe" | "goods";
  id: string;
}

const Comments = ({ which, id }: CommentsProps) => {
  let url = "comment";
  if (which === "goods") {
    url = "goodsreview";
  } else if (which === "recipe") {
    url = "recipereview";
  }

  const [foo, refresh] = useState(0);
  const [comments, setComments] = useFetchListAndUpdate(
    `${url}/${id}`,
    foo
  ) as [any[], React.Dispatch<React.SetStateAction<any[]>>];
  const [showComments, setShowComments] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [form, setForm] = useState({
    nickname: "",
    password: "",
    content: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  }

  function handleClick(e: React.MouseEvent<HTMLHeadingElement>) {
    setShowComments((prev) => !prev);
    setTimeout(() => inputRef.current?.focus(), 700);
  }

  function submit() {
    axios({
      method: "post",
      url: `${url}/${id}`,
      data: form,
    })
      .then((res) => console.log(res.data.object))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <div className="border border-red-400 my-2">
        <h1 onClick={handleClick}>{comments.length}</h1>
        {showComments && (
          <>
            <input
              type="text"
              name="nickname"
              className="h-8"
              placeholder="닉네임"
              required
              ref={inputRef}
              onChange={handleChange}
            />
            <input
              type="password"
              className="h-8"
              placeholder="비밀번호"
              required
              name="password"
              onChange={handleChange}
            />

            <textarea
              name="content"
              className="h-24 focus:outline-none border border-stone-300 col-span-2"
              placeholder="댓글을 작성해주세요"
              required
              onChange={handleChange}
            ></textarea>
            <button
              className="bg-gray-700 w-20 h-10 text-white col-span-2 ml-auto"
              onClick={submit}
              ref={buttonRef}
              style={{ backgroundColor: "#f93d59" }}
            >
              등록
            </button>
          </>
        )}
        {showComments &&
          (comments as any[])?.map((data, idx) => (
            <Comment
              key={idx}
              data={data}
              which={which}
              refresh={refresh}
              setComments={setComments}
            />
          ))}
      </div>
    </div>
  );
};

export default Comments;
