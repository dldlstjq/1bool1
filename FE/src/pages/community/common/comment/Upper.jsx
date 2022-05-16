import React from "react";

/* eslint-disable no-unused-vars */
const Upper = ({ comments, showComments, handleClick }) => {
  return (
    <div className="flex justify-between" onClick={handleClick}>
      <span id="show-comments" className="cursor-pointer">
        댓글 {comments.length}
      </span>
    </div>
  );
};

export default Upper;
