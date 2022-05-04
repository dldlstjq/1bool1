/* eslint-disable no-unused-vars */
import Comment from "./Comment";

function Comments({ comments }) {
  return (
    <>
      <textarea name="comment-input" id="" cols="30" rows="10"></textarea>
      {comments.map(({ content, nickname, password, id, boardId }, idx) => (
        <Comment
          content={content}
          nickname={nickname}
          password={password}
          id={id}
          boardId={boardId}
        />
      ))}
    </>
  );
}

export default Comments;
