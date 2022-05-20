/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import axios from "axios";

import searchIcon from "./search.png";

export function Searchbar({ url, setState }) {
  const buttonRef = useRef();
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  function handleChange({ target }) {
    const { value } = target;
    setInput(value);
  }
  function applyFilter(url) {
    axios({
      method: "get",
      url,
      params: { search: input },
    })
      .then((res) => setState(res.data.object))

  }

  return (
    <div className="relative w-56 inline-block">
      <input
        type="text"
        name="content"
        className="border border-slate-300 h-12 md:h-14 w-full rounded"
        placeholder="검색어를 입력해주세요"
        value={input.content}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") applyFilter(url);
        }}
      />
      <button
        className="h-12 w-12 md:h-14 md:w-14 absolute right-0"
        ref={buttonRef}
        onClick={() => applyFilter(url)}
      >
        <img src={searchIcon} alt="" />
      </button>
    </div>
  );
}
