import { Link } from "react-router-dom";
import classNames from "classnames";

function Article({ id, title, nickname, date, password }) {
  return (
    <li className={classNames("article", "relative")}>
      <div className="updown-wrap left-0 top-5 absolute">
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
        <span className="ml-1">{date}</span>
      </div>
    </li>
  );
}

export default Article;
