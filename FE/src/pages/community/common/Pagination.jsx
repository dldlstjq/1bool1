import { useState, useEffect } from "react";
import classNames from "classnames";
import axios from "axios";

import { BASE_URL } from "../../..";

export function Pagination({ setSearchParams, ...rest }) {
  const [i, seti] = useState(1);
  function handleClick({ target }) {
    if (target.matches(".back") && i >= 5) {
      seti(i - 5);
    } else if (target.matches(".forth")) {
      seti(i + 5);
    } else if (target.matches(".page")) {
      setSearchParams({ page: target.id });
    }
  }
  const customclass = "w-8 h-8 text-center";
  return (
    <nav
      className={classNames("flex justify-center", ...Object.values(rest))}
      onClick={handleClick}
    >
      <code className={classNames(customclass, "back")}>&lt;&lt;</code>
      <button className={classNames(customclass, "page")} id={i}>
        {i}
      </button>
      <button className={classNames(customclass, "page")} id={i + 1}>
        {i + 1}
      </button>
      <button className={classNames(customclass, "page")} id={i + 2}>
        {i + 2}
      </button>
      <button className={classNames(customclass, "page")} id={i + 3}>
        {i + 3}
      </button>
      <button className={classNames(customclass, "page")} id={i + 4}>
        {i + 4}
      </button>
      <code
        className={classNames(customclass, "forth")}
        onClick={() => seti(i + 5)}
      >
        &gt;&gt;
      </code>
    </nav>
  );
}
