import { useState } from "react";
import classNames from "classnames";

export function Pagination({ setSearchParams, ...rest }) {
  const [i, seti] = useState(1);
  const [buttons, setButtons] = useState([
    { i, selected: true },
    { i: i + 1, selected: false },
    { i: i + 2, selected: false },
    { i: i + 3, selected: false },
    { i: i + 4, selected: false },
  ]);
  function handleClick({ target }) {
    if (target.matches(".back") && i >= 5) {
      seti(i - 5);
    } else if (target.matches(".forth")) {
      seti((i) => i + 5);
      console.log(i);
    } else if (target.matches(".page")) {
      setSearchParams({ page: target.id });
      setButtons(
        buttons.map(({ i }) =>
          i == target.id ? { i, selected: true } : { i, selected: false }
        )
      );
    }
  }
  const customclass = "w-8 h-8 text-center";
  return (
    <nav
      className={classNames("flex justify-center", ...Object.values(rest))}
      onClick={handleClick}
    >
      <code className={classNames(customclass, "back")}>&lt;&lt;</code>
      {buttons.map(({ i, selected }) => (
        <button
          className={classNames(
            customclass,
            "page",
            "m-1",
            selected && "bg-blue-400 "
          )}
          id={i}
          key={i}
        >
          {i}
        </button>
      ))}
      {/* <button className={classNames(customclass, "page")} id={i}>
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
      </button> */}
      <code
        className={classNames(customclass, "forth")}
        onClick={() => seti(i + 5)}
      >
        &gt;&gt;
      </code>
    </nav>
  );
}
