/* eslint-disable no-unused-vars */
import { useRef, useReducer, useState } from "react";

export function Searchbar({ setFilter, options }) {
  const buttonRef = useRef();
  const imgRef = useRef();
  const [inputs, setinputs] = useState({ category: "title", content: "" });

  function handleFocus({ target }) {
    target.classList.toggle("outline-black", true);
    buttonRef.current.classList.toggle("bg-black", true);
    buttonRef.current.classList.toggle("border", false);
    imgRef.current.src = "/white-search.png";
  }
  function handleBlur({ target }) {
    target?.classList.toggle("outline-black", false);
    buttonRef.current.classList.toggle("bg-black", false);
    imgRef.current.src = "/search.png";
  }
  function handleChange({ target }) {
    const { name, value } = target;
    setinputs({ ...inputs, [name]: value });
  }

  return (
    <div className="my-10 flex justify-center">
      <select
        name="category"
        className="h-12 md:h-14 border border-slate-300"
        value={inputs.category}
        onChange={handleChange}
      >
        {options.map(({ value, text }) => (
          <option value={value} key={value}>
            {text}
          </option>
        ))}
      </select>
      <div className="relative">
        <input
          type="text"
          name="content"
          className="border border-slate-300 h-12 w-56 md:h-14 md:w-72"
          placeholder="검색어를 입력해주세요"
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={inputs.content}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") setFilter(inputs);
          }}
        />
        <button
          className="h-12 w-12 md:h-14 md:w-14 absolute right-0"
          ref={buttonRef}
          onClick={() => setFilter(inputs)}
        >
          <img src="/search.png" alt="" ref={imgRef} />
        </button>
      </div>
    </div>
  );
}

export const articleOptions = [
  { text: "제목", value: "title" },
  { text: "내용", value: "content" },
  { text: "닉네임", value: "nickname" },
];
export const storeOptions = [
  { text: "편의점", value: "" },
  { text: "cu", value: "cu" },
  { text: "내용", value: "content" },
  { text: "닉네임", value: "nickname" },
];
