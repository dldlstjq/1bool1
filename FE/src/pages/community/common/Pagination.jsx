import { Link } from "react-router-dom";
import classNames from "classnames";

function Pagination(props) {
  return (
    <nav
      aria-label="pagination"
      className={classNames("pagination-nav", props.mb)}
    >
      <ul className="pagination">
        <li>
          <Link to="">
            <span aria-hidden="true">&laquo;</span>
            <span className="visuallyhidden">previous set of pages</span>
          </Link>
        </li>
        <li>
          <Link to="">
            <span className="visuallyhidden">page </span>1
          </Link>
        </li>
        <li>
          <Link
            to=""
            //  aria-current="page"
          >
            <span className="visuallyhidden">page </span>2
          </Link>
        </li>
        <li>
          <Link to="">
            <span className="visuallyhidden">page </span>3
          </Link>
        </li>
        <li>
          <Link to="">
            <span className="visuallyhidden">page </span>4
          </Link>
        </li>
        <li>
          <Link to="">
            <span className="visuallyhidden">next set of pages</span>
            <span aria-hidden="true">&raquo;</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
