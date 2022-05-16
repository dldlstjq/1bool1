import React from "react";

/* eslint-disable no-unused-vars */
const Upper = ({ comments, handleClick }) => {
  return (
    <div onClick={handleClick} className="bg-red-500 text-white pl-1">
      댓글 {comments.length}
    </div>
  );
};

export default Upper;
