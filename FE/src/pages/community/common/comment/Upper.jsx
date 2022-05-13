import React from "react";

/* eslint-disable no-unused-vars */
const Upper = ({ comments, showComments, setShowComments, handleClick }) => {
  return (
    <div className="flex justify-between" onClick={handleClick}>
      <span id="show-comments" className="cursor-pointer">
        <div className="mt-2" id="show-comments">
          {showComments ? (
            <i
              className="icon-box icon-info icon-up w-5 h-5"
              id="show-comments"
            ></i>
          ) : (
            <i
              className="icon-box icon-info icon-down w-5 h-5"
              id="show-comments"
            ></i>
          )}
          댓글 {comments.length}
        </div>
      </span>
      <div>
        <span id="report" className="cursor-pointer">
          신고
          <i
            className="icon-box icon-info icon-down w-5 h-5 relative top-1"
            id="report"
          ></i>
        </span>
        <button className="bg-gray-700 text-white w-20 h-10 ml-4" id="focus">
          댓글
        </button>
      </div>
    </div>
  );
};

export default Upper;
