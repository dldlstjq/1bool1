/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";

export function DeleteOrUpdate({
  setInputPw,
  handleDelete,
  readyUpdate,
  inputMode,
}) {
  return (
    <div className="grid-cols-3 gap-2 my-4">
      <input
        type="password"
        className="bg-gray-700 text-white w-20 h-10"
        placeholder="비밀번호"
        name="password"
        onChange={(e) => setInputPw(e.target.value)}
        style={{
          borderRadius: 20,
          borderStyle: "solid",
          borderColor: "#f93d59",
          backgroundColor: "#ffe2e180",
        }}
      />
      <button
        id="delete"
        className="bg-gray-700 text-white w-20 h-10"
        onClick={handleDelete}
        style={{
          backgroundColor: "#f93d59",
          color: "white",
          fontWeight: "bold",
          borderRadius: 20,
          marginLeft: 10,
        }}
      >
        삭제
      </button>
      <button
        id="update"
        className="bg-gray-700 text-white w-20 h-10"
        onClick={readyUpdate}
        style={{
          backgroundColor: "#f93d59",
          color: "white",
          fontWeight: "bold",
          borderRadius: 20,
          marginLeft: 10,
        }}
      >
        {inputMode ? "수정취소" : "수정"}
      </button>
    </div>
  );
}
