/* eslint-disable no-unused-vars */
// import classNames from "classnames";

import { Link } from "react-router-dom";

interface ArticleProps {
  id: string;
  title: string;
  nickname: string;
  password: string;
  date: string;
  modifiedDate: string;
  content: string;
  photo: string;
}
interface Data {
  data: ArticleProps;
}
function Article({ data }: Data) {
  const { id, title, nickname, date }: ArticleProps = data;

  return (
    <div>
      {/* <div className="updown-wrap absolute" style={{ left: 0, top: "30%" }}>
        <div className="icon-updown-box relative bottom-2">
          <i
            className="icon-box icon-info icon-up w-5 h-4 top-2 relative"
            style={{ display: "block" }}
          ></i>
          <i
            className="icon-box icon-info icon-down w-5 h-4 top-2 relative bottom-1"
            style={{ display: "block" }}
          ></i>
        </div>
        5
      </div> */}
      <Link
        className="text-2xl bg-red-500 text-white text-ellipsis overflow-hidden pl-1"
        style={{ wordBreak: "keep-all" }}
        to={`/community/${id}`}
        state={data}
      >
        {title}
      </Link>
      {/* <i className="icon-box icon-info icon-comment w-5 h-4"></i> 22
        <i className="icon-box icon-info icon-views w-5 h-4 ml-1"></i> 21 */}
      <p className="pl-1">By {nickname}</p>
      <p className="pl-1">{date}</p>
    </div>
  );
}

export default Article;
