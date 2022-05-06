/* eslint-disable no-unused-vars */
import { useRef } from "react";

function Searchbar() {
  const buttonRef = useRef();
  const imgRef = useRef();

  function handleFocus({ target }) {
    target.classList.toggle("outline-black", true);
    buttonRef.current.classList.toggle("bg-black", true);
    buttonRef.current.classList.toggle("border", false);
    imgRef.current.src = "/white-search.png";
  }
  function handleBlur({ target }) {
    target.classList.toggle("outline-black", false);
    buttonRef.current.classList.toggle("bg-black", false);
    imgRef.current.src = "/search.png";
  }

  return (
    <div className="my-10 flex justify-center">
      <select className="h-12 border border-slate-300">
        <option value="1">제목</option>
        <option value="2">제목+내용</option>
        <option value="3">작성자</option>
      </select>
      <div className="relative">
        <input
          type="text"
          className="border border-slate-300 h-12 w-56 md:h-14 md:w-72"
          placeholder="검색어를 입력해주세요"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button
          className="h-12 w-10 md:h-14 md:w-14 absolute right-0"
          ref={buttonRef}
        >
          <img src="/search.png" alt="" ref={imgRef} />
        </button>
      </div>
    </div>
  );
}

export default Searchbar;
