/* eslint-disable no-unused-vars */
import classNames from "classnames";

interface ArticleProps {
  id: string;
  title: string;
  nickname: string;
  date: string;
}

function Article({ id, title, nickname, date }: ArticleProps) {
  return (
    <li className={classNames("article", "relative")}>
      <div className="updown-wrap absolute" style={{ left: 0, top: "30%" }}>
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
      </div>
      <h3 className="article-title" id={id}>
        {title}
      </h3>
      <div className="icons">
        <i className="icon-box icon-info icon-comment w-5 h-4"></i> 22
        <i className="icon-box icon-info icon-views w-5 h-4 ml-1"></i> 21
        <span className="author ml-1">{nickname}</span>
        <div className="">{date}</div>
      </div>
    </li>
  );
}

export default Article;
