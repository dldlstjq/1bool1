import { Link } from "react-router-dom";

function Pagination() {
  return (
    <nav aria-label="pagination">
      <ul class="pagination">
        <li>
          <Link to="/">
            <span aria-hidden="true">&laquo;</span>
            <span class="visuallyhidden">previous set of pages</span>
          </Link>
        </li>
        <li>
          <Link to="/">
            <span class="visuallyhidden">page </span>1
          </Link>
        </li>
        <li>
          <Link to="/" aria-current="page">
            <span class="visuallyhidden">page </span>2
          </Link>
        </li>
        <li>
          <Link to="/">
            <span class="visuallyhidden">page </span>3
          </Link>
        </li>
        <li>
          <Link to="/">
            <span class="visuallyhidden">page </span>4
          </Link>
        </li>
        <li>
          <Link to="/">
            <span class="visuallyhidden">next set of pages</span>
            <span aria-hidden="true">&raquo;</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
